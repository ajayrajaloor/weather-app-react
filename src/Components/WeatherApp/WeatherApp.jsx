import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  let api_key = "79cf7d135e8595283e04cf7cf14732ab";

  const [wicon, setWicon] = useState(cloud_icon);
  const [cityInput, setCityInput] = useState("");

  const search = async () => {
    if (cityInput === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network responses was not ok");
      }

      let data = await response.json();
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
      temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
      location[0].innerHTML = data.name;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
