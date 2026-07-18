
import { useState, useEffect } from "react";
import weatherServcie from "../services/weather";

function Weather({lat,lan, capital}) { 

    const [weather, setWeather] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);

    const handleWeaher = () => { 
        weatherServcie.get(lat,lan)
        .then(data => { 
            setWeather(data);
        })
        .catch(error => {
            setWeather(null)
        })
        .finally(data => setIsLoading(false));
    }

    useEffect(handleWeaher, []);

    return(
            isLoading ? (
                <p>Loading weather Info ...</p>
            ) : (
                weather ? (
                    <div>
                        <h1>Weather In {capital}</h1>
                        <p>Temperature {weather.main.temp} Celsius</p>

                        <img
                            src={weatherServcie.getIcon(weather.weather[0].icon)}
                            alt={weather.weather[0].icon}
                        />

                        <p>Wind {weather.wind.speed} m/s</p>
                    </div>
                ) : (
                    <p>Unable to fetch weather details</p>
                )
            )
        );
}

export default Weather; 