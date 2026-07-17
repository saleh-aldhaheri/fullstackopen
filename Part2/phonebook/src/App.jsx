import { useState, useEffect } from 'react'
import Person from './components/Person';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personService from './services/persons'; 
import axios from 'axios';
import Notification from './components/Notification';

function App() {

  //hooks useState
  const [persons, setPersons] = useState([]); 
  const [newPerson, setNewPerson] = useState({name: '', number: ''});
  const [newFilter, setNewFilter] = useState(); 
  const [notification, setNotification] = useState(null); 

  // handlers
  const handleFetchPersons = () => { 
     personService.getAll() 
            .then(data => setPersons(data));
  }

  const handleReemove = (person) => {  
    if(window.confirm(`Delet ${person.name}?`)) {
      personService.destroy(person.id)
      .then(data => setPersons(persons.filter(p => p.id !== person.id)))
      .then(data => { 
        handleNotification(`Deleted ${person.name}`,'sucess');
      })
      .catch(error =>  {
        setPersons(persons.filter(p => p.id !== person.id));
        handleNotification(person, 'error');
      });
    } 
  }

  const handlePerson = () => {  
       
    event.preventDefault();
        
    const existPerson = persons.filter(person => person.name === newPerson.name);

    if(existPerson.length >  0) {  
      if(window.confirm(`${newPerson.name} is already added, replace the old phone number with the new one?`)) { 

        const updatedPerson =  {...existPerson[0], ...newPerson};
          
        personService.update(updatedPerson)
        .then(data => setPersons(persons.map(person => person.id === data.id ? data :  person)))
        .then(data => { 
          handleNotification(`Number is Changed ${updatedPerson.number}`,'sucess');
        })
        .catch(error =>  {
          setPersons(persons.filter(person => person.id !== existPerson[0].id));
          handleNotification(existPerson[0], 'error');
        });
      }

    }else { 
        personService.create(newPerson)
        .then(data =>  setPersons([...persons, data]))
         .then(data => { 
          handleNotification(`Added ${newPerson.name}`, 'sucess');
        })
        .catch(error =>  handleNotification(error.message, 'error'));
    }        

    setNewPerson({name: "",  number: ""}); 
  }

  const handleNewName = () => {  
    setNewPerson({...newPerson, name: event.target.value} ); 
   }
  
  const handleNewNumber = () => {  
    setNewPerson({...newPerson, number: event.target.value} ); 
  }

  const handleNotification = (message, type) => { 
    
    if(type === 'error') { 
      message = `Information of ${message.name} has already being removed from server`;
    } 

    setNotification({message, type}); 
      setTimeout(() => {
        setNotification(null); 
    }, 10000);
  }
  
  //useEffect hooks 
  useEffect(handleFetchPersons, []);

  // variables
  const personsList = newFilter?  persons.filter(p =>  p.name.toLowerCase().includes(newFilter.toLowerCase())) : persons; 

  return ( 
    <div> 
      <h2>Phonebook</h2>

       <Notification message={notification} />
       
       <Filter newFilter={newFilter} setNewFilter={setNewFilter} />  

      <h2>add new</h2>
      <PersonForm 
        person = {newPerson} 
        handleNewName = {handleNewName}
        handleNewNumber = {handleNewNumber}
        handlePerson = {handlePerson}
      /> 

      <h2>Numbers</h2> 
      {personsList.map((person) => <Person key={person.id} person={person} remove={() => handleReemove(person)}/>)}
     
    </div>   
  )
}

export default App
