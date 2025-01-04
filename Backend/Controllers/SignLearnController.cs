using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Threading.Tasks;
using Backend.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SignLearnController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public SignLearnController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // Get all signs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SignLearn>>> GetSigns()
        {
            return await _context.SignLearns.ToListAsync();
        }

        // Get sign by word
        [HttpGet("{word}")]
        public async Task<ActionResult<SignLearn>> GetSign(string word)
        {
            var sign = await _context.SignLearns.FirstOrDefaultAsync(s => s.Word == word);
            if (sign == null)
                return NotFound();

            return sign;
        }

        // Create new sign
        [HttpPost]
        public async Task<ActionResult<SignLearn>> CreateSign([FromForm] SignLearnDto signDto)
        {
            if (await _context.SignLearns.AnyAsync(s => s.Word == signDto.Word))
                return BadRequest("Word already exists");

            var sign = new SignLearn
            {
                Id = Guid.NewGuid(),
                Word = signDto.Word,
                Description = signDto.Description
            };

            if (signDto.Video != null)
            {
                string videoPath = Path.Combine(_environment.WebRootPath, "videos");
                if (!Directory.Exists(videoPath))
                    Directory.CreateDirectory(videoPath);

                string uniqueFileName = signDto.Video.FileName;
                string filePath = Path.Combine(videoPath, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await signDto.Video.CopyToAsync(stream);
                }

                sign.VideoName = uniqueFileName;
            }

            _context.SignLearns.Add(sign);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSign), new { word = sign.Word }, sign);
        }

        // Get all words
        [HttpGet("words")]
        public async Task<ActionResult<IEnumerable<string>>> GetAllWords()
        {
            return await _context.SignLearns
                .OrderBy(s => s.Word)
                .Select(s => s.Word)
                .ToListAsync();
        }

        [HttpGet("progress")]
        public async Task<ActionResult<WordProgressDto>> GetProgress()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var user = await _context.Users.FindAsync(Guid.Parse(userId));
                if (user == null)
                    return NotFound("User not found");

                return new WordProgressDto
                {
                    CurrentWord = user.CurrentWord ?? "",
                    CompletedWords = !string.IsNullOrEmpty(user.CompletedWords)
                        ? user.CompletedWords.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
                        : new List<string>()
                };
            }
            catch (Exception ex)
            {
                return BadRequest($"Error getting progress: {ex.Message}");
            }
        }

        [HttpPost("start")]
        public async Task<ActionResult<WordProgressDto>> StartCourse()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var user = await _context.Users.FindAsync(Guid.Parse(userId));
                if (user == null)
                    return NotFound("User not found");

                // Only start if not already started
                if (!string.IsNullOrEmpty(user.CurrentWord))
                {
                    return Ok(new WordProgressDto
                    {
                        CurrentWord = user.CurrentWord,
                        CompletedWords = !string.IsNullOrEmpty(user.CompletedWords)
                            ? user.CompletedWords.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
                            : new List<string>()
                    });
                }

                var firstWord = await _context.SignLearns
                    .OrderBy(s => s.Word)
                    .Select(s => s.Word)
                    .FirstOrDefaultAsync();

                if (firstWord == null)
                    return NotFound("No words available in the course");

                user.CurrentWord = firstWord;
                user.CompletedWords = "";
                await _context.SaveChangesAsync();

                return Ok(new WordProgressDto
                {
                    CurrentWord = firstWord,
                    CompletedWords = new List<string>()
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error starting course: {ex.Message}");
            }
        }

        [HttpPost("complete")]
        public async Task<ActionResult<WordProgressDto>> CompleteWord([FromBody] CompleteWordDto dto)
        {
            try
            {
                if (string.IsNullOrEmpty(dto?.Word))
                    return BadRequest("Word is required");

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var user = await _context.Users.FindAsync(Guid.Parse(userId));
                if (user == null)
                    return NotFound("User not found");

                // Validate current word
                if (user.CurrentWord != dto.Word)
                    return BadRequest("This is not your current word");

                // Get completed words list
                var completedWords = !string.IsNullOrEmpty(user.CompletedWords)
                    ? new List<string>(user.CompletedWords.Split(',', StringSplitOptions.RemoveEmptyEntries))
                    : new List<string>();

                // Add current word to completed list if not already there
                if (!completedWords.Contains(dto.Word))
                {
                    completedWords.Add(dto.Word);
                    user.CompletedWords = string.Join(",", completedWords);
                }

                // Find next available word
                var nextWord = await _context.SignLearns
                    .Where(s => !completedWords.Contains(s.Word))
                    .OrderBy(s => s.Word)
                    .Select(s => s.Word)
                    .FirstOrDefaultAsync();

                user.CurrentWord = nextWord; // Will be null if no more words available
                await _context.SaveChangesAsync();

                return Ok(new WordProgressDto
                {
                    CurrentWord = nextWord ?? "",
                    CompletedWords = completedWords,
                    IsCompleted = nextWord == null
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error completing word: {ex.Message}");
            }
        }
    }
} 