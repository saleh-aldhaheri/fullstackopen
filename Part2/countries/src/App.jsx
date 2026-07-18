import { useState, useEffect } from 'react'
import countriesService from './services/countries';
import Search from './components/Search';
import CountryDetails from './components/CountryDetail';
import Country from './components/Country';

function App() {

  const [countries, setCountries] = useState([]); 
  const [search, setSearch] = useState(''); 

  const handleFetchCountires = () => {  
    countriesService.getAll()
    .then(data => setCountries(data)); 
  }

  useEffect(handleFetchCountires, []);
  
  const handleSearch = () => {  
      setSearch(event.target.value);
  }
  
  const filterCountries = () => {  
    const filtred =  countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())); 
    const count = filtred.length;  
    return [filtred, count];
  }

  const [filtred, count] = filterCountries(); 
  const countiresList = count > 0 && count <= 10? filtred : []; 

  return (
   <div> 
      <Search search={search} handleSearch={handleSearch}/> 
      
      {
        count > 10? 
         <p>To many Matches, specify another filter</p> :  
         null
      }

      {
        countiresList.length  == 1 ? 
        <CountryDetails country={countiresList[0]}/>:   
        countiresList.map(country => <Country country={country} /> )
      }
   </div>
  )
}

export default App
