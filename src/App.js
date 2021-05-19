import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import UserInputs from './UserInputs.js';
import WeatherDashboard from './WeatherDashboard.js';

// Style element via CSS-in-JS
const overarchingStyles = css`
  text-align: center;
`;
const inputStyles = css`
  align-items: center;
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: row;
  margin: 20px;
`;
const outputStyles = css`
  background-color: #fafafa;
  max-width: 300px;
  padding: 5px;
  margin: auto;
  margin-top: 30px;
  display: flexbox;
  justify-content: center;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  border-radius: 5px;
`;

function App() {
  const [location, setLocation] = useState('Vienna');
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState('01d');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  // api Key to be hidden in .env.local before commit

  // API URL contains "metric" unit parameter in the end - source:
  // https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  // Fetch API data on button click (in UserInputs)

  function submitLocation() {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data.weather[0].description);
        setTemperature(data.main.temp);
        setMin(data.main.temp_min);
        setMax(data.main.temp_max);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setIcon(data.weather[0].icon);
        return;
      });
  }

  // Detect user location - see source:
  // https://javascript.plainenglish.io/how-to-use-the-geolocation-api-in-your-react-app-54e87c9c6c94

  const getLocation = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus('Unable to retrieve your location');
        },
      );
    }
  };

  return (
    <div css={overarchingStyles}>
      <h1>
        <span role="img" aria-label="waving hand">
          👋
        </span>{' '}
        Welcome friend. This is my React Weather App!
      </h1>

      <div css={inputStyles}>
        {/* Manual user inputs */}
        <UserInputs
          location={location}
          setLocation={setLocation}
          submitLocation={submitLocation}
        />
      </div>
      {/* Dispyay weather data */}
      <div css={outputStyles}>
        <WeatherDashboard
          weather={weather}
          temperature={temperature}
          min={min}
          max={max}
          humidity={humidity}
          wind={wind}
          icon={icon}
        />
      </div>
      {/* User location */}
      <div>
        <h2>Your coordinates:</h2>
        <p>{status}</p>
        <p>Latitude: {lat}</p>
        <p>Longitude: {lng}</p>
        <button onClick={getLocation}>Get your location</button>
      </div>
    </div>
  );
}

export default App;
