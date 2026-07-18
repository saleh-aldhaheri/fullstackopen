import { useState } from "react";
import CountryDetail from "./CountryDetail";

function Country({country}) { 
  const [showDetail, setShowDetail] = useState(false); 

  const handleShowDetail =  () => setShowDetail(!showDetail);

  return (
    <div>  
        {showDetail? <CountryDetail country={country} /> : country.name.common} 
        <button onClick={handleShowDetail}>{showDetail? "hide": "show"}</button>
    </div>
  )
}

export default Country; 