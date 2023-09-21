// Controllers/WeatherController.cs

using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class WeatherController : ControllerBase
{
    private readonly WeatherService _weatherService;

    public WeatherController()
    {
        _weatherService = new WeatherService();
    }

    [HttpGet("{city}")]
    public async Task<IActionResult> GetTemperatureForCity(string city)
    {
        try
        {
            var temperature = await _weatherService.GetTemperatureForCity(city);
            return Ok(new { Temperature = temperature });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
