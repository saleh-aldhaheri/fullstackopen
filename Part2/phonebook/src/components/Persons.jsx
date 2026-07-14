function Person({persons, newFilter}) { 
   
    const personsList = newFilter?  persons.filter(p =>  p.name.toLowerCase().includes(newFilter.toLowerCase())) : persons; 

    return  personsList.map((p) =><p key={p.id}>{p.name} {p.number}</p>);
}

export default Person; 