import React, { useState } from "react";
import { fetchSevenDayForecast, fetchWeather } from "../api/weatherApi";
import { Feather } from "lucide-react";

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
    <div className="flex">
      <input
        type="text"
        placeholder="This is a text"
        onChange={(e) => setCity(e.target.value)}
        className="bg-[#2f2a6183] border border-slate-300 w-full p-3 rounded-md text-light-blue"
      />
      <button onClick={handleSearch} className="bg-light-blue rounded-md ml-6 px-10 text-[#2f2a61] hover:bg-[#2f2a60] hover:text-light-blue">
        Search
      </button>
    </div>
  );
};

export default Input;
