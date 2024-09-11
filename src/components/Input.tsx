import React, { useState, useEffect } from "react";
import { fetchSevenDayForecast, fetchWeather } from "../api/weatherApi";
import { Search } from "lucide-react";

interface InputProps {
  setWeather: (weather: any) => void;
  setError: (error: string) => void;
  setSevenDaysForcast: (sevenDaysForcast: any) => void;
}

const locations = [
  "London", "New York", "Tokyo", "Paris", "Berlin", "Moscow", "Beijing", "Sydney", "Rio de Janeiro", "Cairo",
  "Mumbai", "Delhi", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Ahmedabad", "Pune", "Surat", "Jaipur",
  "Kerala", "Goa", "Rajasthan", "Gujarat", "Maharashtra", "Uttar Pradesh", "Madhya Pradesh", "Tamil Nadu", "Karnataka", "Andhra Pradesh",
  "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin",
  "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Quebec City", "Winnipeg", "Hamilton", "Halifax",
  "Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León", "Juárez", "Torreon", "Querétaro", "Cancún",
  "São Paulo", "Buenos Aires", "Lima", "Bogotá", "Santiago", "Caracas", "Montevideo", "Quito", "La Paz", "Asunción",
  "Lagos", "Kinshasa", "Johannesburg", "Nairobi", "Accra", "Addis Ababa", "Dakar", "Casablanca", "Khartoum", "Alexandria",
  "Istanbul", "Tehran", "Baghdad", "Riyadh", "Ankara", "Kabul", "Tel Aviv", "Dubai", "Abu Dhabi", "Doha",
  "Bangkok", "Ho Chi Minh City", "Kuala Lumpur", "Singapore", "Jakarta", "Manila", "Hanoi", "Yangon", "Phnom Penh", "Vientiane",
  "United States", "Canada", "United Kingdom", "Germany", "France", "Italy", "Spain", "Australia", "Japan", "South Korea",
  "China", "India", "Brazil", "Russia", "Mexico", "Indonesia", "Pakistan", "Nigeria", "Bangladesh", "Vietnam",
  "California", "Texas", "Florida", "New York", "Pennsylvania", "Illinois", "Ohio", "Georgia", "North Carolina", "Michigan"
];

export default function Component({ setWeather, setError, setSevenDaysForcast }: InputProps) {
  const [location, setLocation] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    if (location.length > 0) {
      const filteredSuggestions = locations.filter(loc =>
        loc.toLowerCase().startsWith(location.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [location]);

  const handleSearch = async () => {
    console.log(location);
    const res = await fetchWeather(location);

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
      setError("Failed to fetch the weather data");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex">
        <input
          type="text"
          placeholder="Enter a location (city, state, or country)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="bg-[#2f2a6183] border border-slate-300 w-full p-3 rounded-l-md text-light-blue"
        />
        <button 
          onClick={handleSearch} 
          className="bg-light-blue rounded-r-md px-4 text-[#2f2a61] hover:bg-[#2f2a60] hover:text-light-blue"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}