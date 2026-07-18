import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

function get (lat, lon) {
  return axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
  .then(response => response.data);
}

function getIcon(icon) { 
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export default {
  get,
  getIcon
};