function WeatherDashboard({
  weather,
  temperature,
  min,
  max,
  humidity,
  wind,
  icon,
}) {
  return (
    <div>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />
      <p>Weather: {weather}</p>
      <p>Temperature: {Math.round(parseInt(temperature))} °Celsius</p>
      <p>Min: {Math.round(parseInt(min))} °Celsius</p>
      <p>Max: {Math.round(parseInt(max))} °Celsius</p>
      <p>Humidity: {humidity} %</p>
      <p>Wind speed: {Math.round(parseInt(wind))} meter/sec</p>
    </div>
  );
}

export default WeatherDashboard;
