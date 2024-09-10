import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_APP_API_KEY;
export const fetchWeather = async (city: string) => {
    
    const options = {
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
        headers: {},
    };
    try {
        const response = await axios.request(options);
        console.log(response)
        return response;
    } catch (error: any) {
        console.log(error);
        throw new Error('Failed to fetch weather data', error);
    }
};

export const fetchSevenDayForecast = async (coord:any) => {
    const {lat,lon} = coord
    console.log(coord)
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    try {
        const response = await axios.get(url);
        console.log(response)
        return response; // Returns 7-day forecast data
    } catch (error: any) {
        console.error('Error fetching forecast data:', error);
        throw new Error('Failed to fetch forecast data');
    }
};
