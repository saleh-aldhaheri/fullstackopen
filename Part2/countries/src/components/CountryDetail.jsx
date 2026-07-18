import { useEffect, useState } from "react";
import Weather from "./Weather";

function CountryDetail({country}) { 

    return (
        <div>  
            <h1>{country.name.common}</h1>
            <p>Captial {country.capital[0]}</p>
            <p>Area {country.capital[0]}</p>

            <h1>Languages</h1>   
            <ul> 
                {Object.values(country.languages).map(lang => <li>{lang}</li>)}
            </ul>

            <img src={country.flags.png} alt={country.flags.alt} />
            {
                country.capitalInfo?.latlng? 
                <Weather lat={country.capitalInfo.latlng[0]} lan={country.capitalInfo.latlng[1]} capital={country.capital[0]}/> : 
                <p>Weahter Detail not Avaliable</p>
            }
            
        </div>
  );
}

export default CountryDetail;