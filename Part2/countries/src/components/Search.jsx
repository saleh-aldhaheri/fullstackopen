
function Search({search, handleSearch}) {  
  
    return <div> 
             find counties <input type="text" value={search} onChange={handleSearch} /> 
           </div>
}


export default Search;