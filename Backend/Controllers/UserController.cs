using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UserController(IUserRepository _userRepository) : ControllerBase
	{
		[Authorize]
		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
		{
			var users = await _userRepository.GetAllAsync();
			return Ok(users);
		}

		[Authorize]
		[HttpGet("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<ActionResult<User>> GetUserById(Guid id)
		{
			var user = await _userRepository.GetByIdAsync(id);
			if (user == null)
			{
				return NotFound();
			}
			return Ok(user);
		}

		[Authorize]
		[HttpGet("email/{email}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<ActionResult<User>> GetUserByEmail(string email)
		{
			var user = await _userRepository.GetByEmailAsync(email);
			if (user == null)
			{
				return NotFound();
			}
			return Ok(user);
		}

		[Authorize]
		[HttpPut("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<ActionResult<User>> UpdateUser(Guid id, [FromBody] UpdateUserDto updateDto)
		{
			try
			{
				var user = await _userRepository.UpdateAsync(id, updateDto);
				return Ok(user);
			}
			catch (Exception ex)
			{
				return BadRequest(new { message = ex.Message });
			}
		}

		[Authorize]
		[HttpDelete("{id}")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> DeleteUser(Guid id)
		{
			await _userRepository.DeleteAsync(id);
			return NoContent();
		}
	}
}