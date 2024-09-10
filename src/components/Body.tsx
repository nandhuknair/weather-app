import React, { useState } from "react";
import Input from "./Input";
import WeatherCard from "./WeatherCard";

const Body: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [sevenDaysForcast, setSevenDaysForcast] = useState<any>(null);
  console.log(sevenDaysForcast+' '+'This is teh seven day forcaset');
  return (
    <div className="">
      <Input
        setWeather={setWeather}
        setError={setError}
        setSevenDaysForcast={setSevenDaysForcast}
      />

      {error && (
        <div>
          <h1>{error}</h1>
        </div>
      )}

      {weather && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-semibold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-lg">
            {weather.weather[0].main} - {weather.weather[0].description}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
            className="mx-auto"
          />
          <p className="text-lg">
            Temperature: {weather.main.temp}°C (Feels like:{" "}
            {weather.main.feels_like}°C)
          </p>
          <p className="text-lg">Humidity: {weather.main.humidity}%</p>
          <p className="text-lg">Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}

      {sevenDaysForcast && (
      <div className="flex justify-between mt-4">
        {sevenDaysForcast.map((data:any)=> {
          return(
              <h1>Hello</h1>
          )
        })}
        
      </div>
      )}
    </div>
  );
};

export default Body;
