import { useState, useEffect } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import axios from 'axios';

function App() {
  
  const [persons, setPersons] = useState([]); 

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState(); 
  
  const fetchPersons =  () => { 
      axios.get('http://localhost:3001/persons')
            .then(response => setPersons(response.data));
  }
  
  useEffect(fetchPersons, []);


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
