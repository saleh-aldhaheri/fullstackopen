import axios from 'axios'; 

const baseUrl =  'http://localhost:3001/persons';

function getAll() { 
    return axios.get(baseUrl)
        .then(response => response.data);
}

function create(person) { 
    return axios.post(baseUrl, person)
            .then(response => response.data);
}

function update(person) { 
    return axios.put(`${baseUrl}/${person.id}`, person)
    .then (response => response.data);
}

function destroy(id) { 
    return axios.delete(`${baseUrl}/${id}`).
    then(response =>  response.data);
}
export default { 
    getAll, 
    create,
    update, 
    destroy
}