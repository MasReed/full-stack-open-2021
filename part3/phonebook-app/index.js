const express = require('express');

const app = express();

const persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-4323423'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '39-23-6423122'
    },
    {
        id: 5,
        name: 'Croix',
        number: '23-42-4984899'
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {

    const nPeople = persons.length;
    const time = new Date();
    const infoPage = `Phonebook has info for ${nPeople} people. ${time}`;

    res.send(infoPage)
});



const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})
