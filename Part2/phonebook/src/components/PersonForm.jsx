function PersonForm({person, handlePerson, handleNewName, handleNewNumber}) {  
    

    return <form onSubmit={handlePerson}>  
             <div>name:<input value={person.name} onChange={handleNewName}/>  </div>
             <div>number: <input value={person.number} onChange={handleNewNumber}/></div>
             <button type="submit">add</button> 
           </form>;
}

export default PersonForm;