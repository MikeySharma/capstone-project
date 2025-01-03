using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Threading.Tasks;
using Backend.DTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

                string uniqueFileName = $"{Guid.NewGuid()}_{signDto.Video.FileName}";
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

        // Update sign
        [HttpPut("{word}")]
        public async Task<IActionResult> UpdateSign(string word, [FromForm] SignLearnDto signDto)
        {
            var existingSign = await _context.SignLearns.FirstOrDefaultAsync(s => s.Word == word);
            if (existingSign == null)
                return NotFound();

            if (signDto.Video != null)
            {
                // Delete old video if exists
                if (!string.IsNullOrEmpty(existingSign.VideoName))
                {
                    string oldVideoPath = Path.Combine(_environment.WebRootPath, "videos", existingSign.VideoName);
                    if (System.IO.File.Exists(oldVideoPath))
                        System.IO.File.Delete(oldVideoPath);
                }

                // Save new video
                string videoPath = Path.Combine(_environment.WebRootPath, "videos");
                string uniqueFileName = $"{Guid.NewGuid()}_{signDto.Video.FileName}";
                string filePath = Path.Combine(videoPath, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await signDto.Video.CopyToAsync(stream);
                }

                existingSign.VideoName = uniqueFileName;
            }

            existingSign.Word = signDto.Word;
            existingSign.Description = signDto.Description;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Delete sign
        [HttpDelete("{word}")]
        public async Task<IActionResult> DeleteSign(string word)
        {
            var sign = await _context.SignLearns.FirstOrDefaultAsync(s => s.Word == word);
            if (sign == null)
                return NotFound();

            // Delete video file if exists
            if (!string.IsNullOrEmpty(sign.VideoName))
            {
                string videoPath = Path.Combine(_environment.WebRootPath, "videos", sign.VideoName);
                if (System.IO.File.Exists(videoPath))
                    System.IO.File.Delete(videoPath);
            }

            _context.SignLearns.Remove(sign);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
} 