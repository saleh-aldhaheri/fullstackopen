import { useState } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

function App() {
  
  const [persons, setPersons] = useState([]); 

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState(); 
  


  return ( 
    <div> 
      <h2>Phonebook</h2>
       
       <Filter newFilter={newFilter} setNewFilter={setNewFilter} />  

      <h2>add new</h2>
      <PersonForm 
        persons={persons} 
        setPersons={setPersons} 
        newName={newName} 
        newNumber={newNumber} 
        setNewName={setNewName} 
        setNewNumber={setNewNumber} 
      /> 

      <h2>Numbers</h2> 
      <Persons newFilter={newFilter} persons={persons}/>
     
    </div>   
  )
}

export default App
