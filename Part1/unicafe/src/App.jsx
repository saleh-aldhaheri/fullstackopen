import { useState } from 'react'
import Statistics from './components/Statistics';
import Button from './components/Button'; 


function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGood =  () => setGood(good + 1);
    const handleNeutral = () => setNeutral(neutral + 1);  
    const handleBad = () => setBad(bad + 1);

    return (
    <>
      <header> 
        <h1>give feedback</h1> 
      </header>
      <main>
        <section>
          <Button name="good" onClick={handleGood}/>
          <Button name="neutral" onClick={handleNeutral}/>  
          <Button name="bad" onClick={handleBad}/> 
        </section>
        <Statistics good={good} neutral={neutral} bad={bad}/> 
      </main>
    </>
  )
}

export default App
