import { useState } from 'react';
import { useEffect } from 'react';
import Note from './components/Note';
import axios from 'axios'
import noteService  from './services/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  
  useEffect(() => {  
   noteService.getAll().
    then(function (initialNotes) {
       setNotes(initialNotes);
    });
  }, []);

  const addNote = () => {  
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }

    noteService.create(noteObject)
    .then(newNote => { 
      setNotes([...notes,newNote]);
      setNewNote('');  
    }); 
  }

  const toggleImportanceOf = (note) => {
    const changedNote =  {...note, important: !note.important};  
    noteService.update(changedNote)
    .then(updatedNote => {  
       setNotes(notes.map((note) =>  note.id === updatedNote.id? updatedNote : note));   
    }).catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })

  }

  const handleNoteChange = () => { 
    setNewNote(event.target.value);
  }

  const noteToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  return (
    <div>
        <h1>Notes</h1>
        <ul>
          {noteToShow.map(note => 
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note)}/>
          )}
        </ul>
        <button onClick={_ => setShowAll(!showAll)}>  
           {showAll ? 'show Important' : 'show all'}
        </button>
        <div> 
          <form onSubmit={addNote}>  
            <input value={newNote} onChange={handleNoteChange}/> 
            <button type="submit">save</button>
            </form> 
        </div>
    </div>
  )
}

export default App;