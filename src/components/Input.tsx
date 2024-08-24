import React, { useState } from "react";
import { fetchWeather } from "../api/weatherApi";

interface InputProps {
    setWeather:(weather:any)=> void
    setError:(error:string)=> void
}

const Input: React.FC <InputProps> = ({setWeather,setError}) => {
  const [city, setCity] = useState<string>("");
  const handleSearch = () => {
    console.log(city);
    fetchWeather(city)
    .then(res=> {
      if(res?.data?.cod === 404){
        setWeather(null)
        setError(res?.data?.message)
      }
      else if(res?.data?.cod === 200){
        setError('')
        setWeather(res.data)
      }
    })
    .catch(error=> {
      console.log(error)
      setWeather(null)
      setError("Failed to fetch weather data")
    })
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
