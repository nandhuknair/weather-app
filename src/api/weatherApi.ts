import axios from "axios";
export const fetchWeather = async (city: string) => {
    const API_KEY = process.env.REACT_APP_WEATHER_APP_API_KEY;
    const API_HOST = 'open-weather13.p.rapidapi.com';
    const options = {
        method: 'GET',
        url: `https://open-weather13.p.rapidapi.com/city/${city}/EN`,
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
        },
    };
    try {
        const response = await axios.request(options);
        return response;
    } catch (error: any) {
        console.log(error);
        throw new Error('Failed to fetch weather data', error);
    }
};
