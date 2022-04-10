import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  api_key: "6ac6bc788bdca618a4d32a2014750282",
  base_url: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [searchInput, setsearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherInfo, setweatherInfo] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      try {
        const url = `${api.base_url}weather?q=${searchCity}&appid=${api.api_key}`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setweatherInfo(
            `${data.name}, ${data.sys.country}, ${data.weather[0].description}`
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <>
      <div id="container">
        <h1>Check the weather</h1>
        <form id="form" onSubmit={handleSubmit}>
          <div id="search-box">
            <button className="btn-search">
              <i className="fas fa-search"></i>
            </button>
            <input
              id="search-input"
              type="text"
              placeholder="city"
              value={searchInput}
              onChange={(e) => setsearchInput(e.target.value)}
            ></input>
          </div>
        </form>
        {loading ? (
          <div>Still loading...</div>
        ) : (
          <>
            {errorMessage ? (
              <div style={{ color: "red" }}>{errorMessage}</div>
            ) : (
              <div id="weather-info">{weatherInfo}</div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
