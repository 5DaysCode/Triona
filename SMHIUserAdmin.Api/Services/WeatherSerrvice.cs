


using Newtonsoft.Json.Linq;

public class WeatherService
{
    private readonly string _stationsEndpoint = "https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/20.json";
    private JArray _stations;

    public WeatherService()
    {
        FetchStations().Wait();
    }

    private async Task FetchStations()
    {
        using (var client = new HttpClient())
        {
            var response = await client.GetStringAsync(_stationsEndpoint);
            var data = JObject.Parse(response);
            _stations = (JArray)data["station"];
        }
    }

    public async Task<string> GetTemperatureForCity(string city)
    {
        var station = _stations.FirstOrDefault(s => s["name"].ToString().Equals(city, StringComparison.OrdinalIgnoreCase));
        if (station == null)
        {
            throw new Exception($"No matching station found for city: {city}");
        }

        var stationKey = station["key"].ToString();
        
        
        var weatherDataEndpoint = $"https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/20/station/{stationKey}/period/latest-day/data.json";

        using (var client = new HttpClient())
        {
            var response = await client.GetStringAsync(weatherDataEndpoint);
            var weatherData = JObject.Parse(response);
            var temperature = weatherData["value"]?.FirstOrDefault()?["value"]?.ToString();

            return temperature;
        }
    }
}
