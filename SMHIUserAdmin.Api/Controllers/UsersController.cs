using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[Controller]")]
[EnableCors("AllowSpecificOrigin")] // Enabling CORS for the controller
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        this._userService = userService;
    }

    /// <summary>
    /// Retrieves all users from the database.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
    {
        try
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }
        catch (Exception ex)
        {
            // Log the error if you have a logging solution
            // For this example, I'm using Console.WriteLine
            Console.WriteLine(ex);
            return StatusCode(500, "Internal server error");
        }
    }

    /// <summary>
    /// Retrieves a specific user by unique id.
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<User>> GetUserById(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    /// <summary>
    /// Creates a new user.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<User>> AddUser(User user)
    {
        await _userService.AddUserAsync(user);
        return CreatedAtAction(nameof(GetUserById), new { id = user.ID }, user);
    }

    /// <summary>
    /// Updates a specific user's information.
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateUser(int id, User user)
    {
        if (id != user.ID)
        {
            return BadRequest("Mismatched user ID.");
        }

        try
        {
            await _userService.UpdateUserAsync(user);
            return NoContent();
        }
        catch (Exception ex)
        {
            // Log the error if you have a logging solution
            Console.WriteLine(ex);
            return NotFound($"User with ID {id} not found.");
        }
    }

    /// <summary>
    /// Deletes a specific user by unique id.
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            await _userService.DeleteUserAsync(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            // Log the error if you have a logging solution
            Console.WriteLine(ex);
            return NotFound($"User with ID {id} not found.");
        }
    }
}
