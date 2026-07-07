import StatisticsLine from "./StatisticsLine";

function Statistics ({good, neutral, bad}) { 

    const all      =  good + neutral + bad;  
    const average  =  all  ? ((good - bad) / all).toFixed(3) : 0;
    const positive =  all  ? ((good / all) * 100).toFixed(3) : 0;

    return (
        <section>
            <h2>Statistics</h2> 
            {all ?  
            <table>
                <tbody>
                    <StatisticsLine title="good" value={good}/> 
                    <StatisticsLine title="neutral" value={neutral}/> 
                    <StatisticsLine title="bad" value={bad}/> 
                    <StatisticsLine title="all" value={all}/> 
                    <StatisticsLine title="average" value={average}/> 
                    <StatisticsLine title="positive" value={positive}/> 
                </tbody>
            </table> : 
            <p>No feedback given</p>
            }
        </section>
    )
}

export default Statistics; 