import React from 'react';

interface WeatherItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherCardProps {
  data: WeatherItem;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  console.log('this is the data from seven day forcast '+' '+data)
  const { dt_txt, main, weather, wind, clouds } = data;
 console.log(weather,dt_txt,main,wind,clouds)
  // Ensure weather array is not empty or undefined
 

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4 max-w-sm">
      <h3 className="text-xl font-semibold mb-2">{new Date(dt_txt).toLocaleString()}</h3>
      <div className="flex items-center">
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
          alt={weather[0].description}
          className="w-16 h-16"
        />
        <div className="ml-4">
          <p className="text-lg font-semibold">{weather[0].main}</p>
          <p className="text-sm text-gray-600">{weather[0].description}</p>
          <p className="text-sm">Temp: {(main.temp - 273.15).toFixed(1)}°C (Feels like: {(main.feels_like - 273.15).toFixed(1)}°C)</p>
          <p className="text-sm">Min/Max: {(main.temp_min - 273.15).toFixed(1)}°C / {(main.temp_max - 273.15).toFixed(1)}°C</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm">Humidity: {main.humidity}%</p>
        <p className="text-sm">Pressure: {main.pressure} hPa</p>
        <p className="text-sm">Wind: {wind.speed} m/s at {wind.deg}°</p>
        <p className="text-sm">Cloudiness: {clouds.all}%</p>
      </div>
    </div>
  );
};

export default WeatherCard;
