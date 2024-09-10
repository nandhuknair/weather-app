import React, { useState } from "react";
import { fetchSevenDayForecast, fetchWeather } from "../api/weatherApi";

interface InputProps {
  setWeather: (weather: any) => void;
  setError: (error: string) => void;
  setSevenDaysForcast: (sevenDaysForcast :any)=> void
}

const Input: React.FC<InputProps> = ({ setWeather, setError ,setSevenDaysForcast }) => {
  const [city, setCity] = useState<string>("");

  const handleSearch = async () => {
    console.log(city);
    const res = await fetchWeather(city);

    try {
      if (res?.data?.cod === 404) {
        setWeather(null);
        setError(res?.data?.message);
      } else if (res?.data?.cod === 200) {
        setError("");
        setWeather(res.data);
        try {
          const sevenDays = await fetchSevenDayForecast(res.data.coord)
          console.log(sevenDays.data.list.slice(1,7))
          setSevenDaysForcast(sevenDays.data.list.slice(1,7))
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error);
      setWeather(null);
      setError("Failed to fetch weather data");
    }

  };

  return (
    <div>
      <input
        type="text"
        placeholder="This is a text"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-teal-100 ml-6 p-2">
        Search
      </button>
    </div>
  );
};

export default Input;
