import React, { useState } from "react";
import Input from "./Input";
import { SunSnow } from "lucide-react";
import { format, parseISO } from "date-fns";

const Body: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [sevenDaysForcast, setSevenDaysForcast] = useState<any>(null);

  const getDayName = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "EEEE");
    } catch (error) {
      console.error("Date parsing error:", error);
      return "";
    }
  };

  return (
    <div className="bg-[#0f0c29b0] flex flex-col p-10 rounded-lg pt-6">
      <div className="text-light-blue font-semibold text-3xl mb-8 flex justify-center items-center">
        <h1>Cosmic weather </h1>{" "}
        <SunSnow className="h-8 w-8 ml-4 text-light-blue" />
      </div>
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
        <div className="text-light-blue font-bold flex flex-col justify-center items-center mt-10 py-6 rounded-lg bg-[#2f2b4c65]">
          <h2 className="text-4xl font-bold mb-2">
            {weather.name}, {weather.sys.country}
          </h2>
          <div className="flex justify-center gap-4 items-center">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="h-20 mx-auto"
            />
            <p className="text-6xl font-bold">{weather.main.temp}°C</p>
          </div>
          <p className="text-3xl uppercase mt-2 text-blue-300">
            {weather.weather[0].main}
          </p>

          <div className="flex gap-5 mt-6 items-center ml-11 text-light-blue">
            <p className="text-lg font-extralight">
              Humidity: {weather.main.humidity}%
            </p>
            <p> & </p>
            <p className="text-lg font-extralight">
              Wind Speed: {weather.wind.speed} m/s
            </p>
          </div>
        </div>
      )}

      
      {sevenDaysForcast&& (
        <h1 className="mt-8 mb-4 ml-1 text-light-blue font-extralight">coming days ►</h1>
      )}

      {sevenDaysForcast && ( 
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 ">
          {sevenDaysForcast.map((data: any, index: number) => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            const temperature = data.main.temp;
            const weather = data.weather[0].main;
            return (
              <div
                key={index}
                className="bg-white/10 border border-blue-500 border-opacity-30 rounded-lg p-4 text-center justify-center">


                <img src={iconUrl} alt="" className="mx-auto h-12 w-12" />

                <p className="text-lg font-bold mt-2 text-blue-100">
                  {temperature}
                </p>
                <p className="text-lg font-bold mt-2 text-[#93c5fd]">
                  {weather}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Body;
