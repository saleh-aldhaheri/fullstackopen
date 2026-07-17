import axios  from 'axios';  

const baseUrl =  'http://localhost:3001/notes';  

/**
 * @return []  
 */
function getAll()  {  
   return axios.get(baseUrl)
   .then(response => { 
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        important: true,
    }

    return response.data.concat(nonExisting);
   });
}

/**
 *  @return note
 */
function update(note) {  
    return axios.put(`${baseUrl}/${note.id}`, note)
     .then(response => response.data);
}

/** 
 * @return note
*/
function create(note) {  
  return axios.post(baseUrl, note)
   .then(response => response.data); 
}


export default {getAll, update, create};