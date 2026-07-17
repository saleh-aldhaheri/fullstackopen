function Person({person,remove}) { 

    return (
        <> 
            <p key={person.id}>{person.name} {person.number}</p>
            <button onClick={remove}>Delete</button>
        </>
    );
}

export default Person; 