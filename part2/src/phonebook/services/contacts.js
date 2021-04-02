import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const createContact = (newContactObject) => {
    const request = axios.post(baseUrl, newContactObject);
    return request.then( response => response.data );
}

const readAllContacts = () => {
    const request = axios.get(baseUrl);
    return request.then( response => response.data );
}

const updateContact = () => {
    return null
}

const deleteContact = (id) => {
    const request = axios.delete(baseUrl + `/${id}`)
    return request.then( response => response.data );
}


const contactsService = { createContact, readAllContacts, updateContact, deleteContact };

export default contactsService;
