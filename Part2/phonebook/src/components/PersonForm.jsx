function PersonForm({persons, setPersons, newName, newNumber, setNewName, setNewNumber}) {  
    
    const handlePersons = () => {  
        
        event.preventDefault();  
        
        if(persons.filter(p => p.name === newName).length > 0) { 
        alert(`${newName} is already added to phonebook`); 
        setNewName('');
        setNewNumber('');
        return;
        }

        const newObject =  { 
        name: newName,
        number: newNumber
        };  

        setPersons([...persons, newObject]);
        setNewName('');
        setNewNumber('');
    }

    const handleNewName = () => {  
        setNewName(event.target.value); 
    }
  
    const handleNewNumber = () => {  
        setNewNumber(event.target.value); 
    }

    return <form onSubmit={handlePersons}>  
             <div>name:<input value={newName} onChange={handleNewName}/>  </div>
             <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
             <button type="submit">add</button> 
           </form>;
}

export default PersonForm;