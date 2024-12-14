import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('Delhi');
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = (city) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    setLoading(true);

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherData(city.trim());
    }
  };

  return (
    <>
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Search for a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          <h2>Location: {data.name}</h2>
          <h3>Temperature: {(data.main.temp - 273.15).toFixed(2)}°C</h3>
          <h3>Weather: {data.weather[0].description}</h3>
        </div>
      ) : (
        <p>No data available. Try searching for a city.</p>
      )}
    </>
  );
}

export default App;
