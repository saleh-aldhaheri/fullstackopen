import { useState, useEffect } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personService from './services/personService'; 
import axios from 'axios';

function App() {

  //hooks useState
  const [persons, setPersons] = useState([]); 
  const [newPerson, setNewPerson] = useState({name: '', number: ''});
  const [newFilter, setNewFilter] = useState(); 

  // handlers
  const handleFetchPersons = () => { 
     personService.getAll() 
            .then(data => setPersons(data));
  }

  const handleReemove = (person) => {  
    if(window.confirm(`Delet ${person.name}?`)) {
      personService.destroy(person.id)
      .then( response => setPersons(persons.filter(p => p.id !== person.id)));
    } 
  }

  const handlePerson = () => {  
       
    event.preventDefault();
        
    const existPerson  = persons.filter(person => person.name === newPerson.name);

    if(existPerson.length >  0) {  
      if(window.confirm(`${newPerson.name} is already added, replace the old phone number with the new one?`)) { 

        const updatedPerson =  {...existPerson[0], ...newPerson};
          
        personService.update(updatedPerson)
        .then(data => setPersons(persons.map(person => person.id == data.id ? data :  person)))
        .catch(error =>  console.log(error));
      }

    }else { 
        personService.create(newPerson)
        .then( data =>  setPersons([...persons, newPerson]))
        .catch(error => console.log(error)); 
    }        

    setNewPerson({name: "",  number: ""}); 
  }

  const handleNewName = () => {  
    setNewPerson({...newPerson, name: event.target.value} ); 
   }
  
  const handleNewNumber = () => {  
    setNewPerson({...newPerson, number: event.target.value} ); 
  }

  
  //useEffect hooks 
  useEffect(handleFetchPersons, []);

  // variables
  const personsList = newFilter?  persons.filter(p =>  p.name.toLowerCase().includes(newFilter.toLowerCase())) : persons; 


  return ( 
    <div> 
      <h2>Phonebook</h2>
       
       <Filter newFilter={newFilter} setNewFilter={setNewFilter} />  

      <h2>add new</h2>
      <PersonForm 
        person = {newPerson} 
        handleNewName = {handleNewName}
        handleNewNumber = {handleNewNumber}
        handlePerson = {handlePerson}
      /> 

      <h2>Numbers</h2> 
      {personsList.map((person) => <Persons key={person.id} person={person} remove={() => handleReemove(person)}/>)}
     
    </div>   
  )
}

export default App
