function Filter({newFilter, setNewFilter}) {  
    
    const handleNewFilter = () => {  
        setNewFilter(event.target.value);
    }
    
    return  <div>filter shown with:<input value={newFilter} onChange={handleNewFilter}/> </div>   
}

export default Filter;