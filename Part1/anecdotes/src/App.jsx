import { useState } from 'react'

const Button = ({onClick, name}) => <button onClick={onClick}>{name}</button>;


function App() {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ];  
    
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0)); 

    const handleSelect = () => { 
      const index = Math.floor(Math.random() * anecdotes.length);  
      setSelected(index);  
    }

    const handleVotes = () =>  {  
      const newVote = [...votes];  
      newVote[selected] = newVote[selected] ? newVote[selected] + 1 : 1;  
      setVotes(newVote);
    }

    const getMaxVotesIndex = votes.indexOf(Math.max(...votes));

  return (
    <>
      <header> 
         <h2>Anecdote of the day</h2>
      </header>
      <main>  
         <p>{anecdotes[selected]}</p> 
         <p>{votes[selected]}</p>
         <Button onClick={handleVotes} name="vote"/> 
         <Button onClick={handleSelect} name="next anecdotes"/> 
      </main> 
      <footer>  
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[getMaxVotesIndex]}</p>
        <p>has {votes[getMaxVotesIndex]} votes</p>
      </footer>      
    </>
  )
}

export default App
