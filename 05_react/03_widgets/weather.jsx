import React, { useEffect, useState } from 'react';

const API_KEY = '1434ac5d54f265c39251866731563d6a';
const URL = 'http://api.openweathermap.org/data/2.5/weather';

const Weather = () => {
  const [city, setCity] = useState();
  const [temp, setTemp] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const {
        coords: { longitude, latitude },
      } = position;
      const query = `?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

      fetch(URL + query)
        .then((response) => response.json())
        .then((data) => {
          setCity(data.name);
          setTemp(data.main.temp);
        })
        .catch((error) => setError(error));
    });
  }, []);

  let content;

  if (error) {
    content = <p>Couldn't get weather data</p>;
  } else if (city == null) {
    content = <p>Loading weather...</p>;
  } else {
    content = (
      <div>
        <p>{city}</p>
        <p>{temp} &#8451;</p>
      </div>
    );
  }

  return (
    <div className="weather">
      <h2>Weather</h2>
      <div className="weather-widget">{content}</div>
    </div>
  );
};

export default Weather;
