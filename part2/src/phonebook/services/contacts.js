import axios from 'axios';

const baseUrl = '/api/persons';

const createContact = (newContactObject) => {
    const request = axios.post(baseUrl, newContactObject);
    return request.then( response => response.data );
}

const readAllContacts = () => {
    const request = axios.get(baseUrl);
    return request.then( response => response.data );
}

const updateContact = (updatedContactObject) => {
    const request = axios.put(baseUrl + `/${updatedContactObject.id}`, updatedContactObject)
    return request.then ( response => response.data );
}

const deleteContact = (id) => {
    const request = axios.delete(baseUrl + `/${id}`)
    return request.then( response => response.data );
}

const contactsService = { createContact, readAllContacts, updateContact, deleteContact };

export default contactsService;
