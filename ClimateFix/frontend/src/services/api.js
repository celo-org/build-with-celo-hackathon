import axios from "axios";

const app = axios.create({
    baseURL: "https://api.weather.com/v3/wx/forecast/daily/3day?geocode=33.74,-84.39&format=json&units=m&language=en-US&apiKey=2b6ed19f3d474152aed19f3d4791527d",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

export default app;