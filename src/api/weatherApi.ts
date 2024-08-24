import axios from "axios";
export const fetchWeather = async (city: string) => {
    const API_KEY = process.env.REACT_APP_WEATHER_APP_API_KEY;
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

