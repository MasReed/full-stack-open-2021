require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Contact = require('./models/contact');

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Phonebook App</h1>');
});

app.get('/api/persons', (req, res) => {
    Contact
        .find({})
        .then(contacts => {
            res.json(contacts)
        })
});

app.get('/api/persons/:id', (req, res) => {
    Contact
        .findById(req.params.id)
        .then(person => {
            res.json(person)
        })
});

//
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter( person => person.id !== id );
    res.status(204).end()

});

// Create
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const contact = new Contact({
        name: body.name,
        number: body.number,
    })

    contact.save().then(savedContact => {
        res.json(savedContact)
    })
});

//
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint);

//
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})



// TEMP DATA
// let persons = [
//     {
//         id: 1,
//         name: 'Arto Hellas',
//         number: '040-123456'
//     },
//     {
//         id: 2,
//         name: 'Ada Lovelace',
//         number: '39-44-4323423'
//     },
//     {
//         id: 3,
//         name: 'Dan Abramov',
//         number: '12-43-234345'
//     },
//     {
//         id: 4,
//         name: 'Mary Poppendick',
//         number: '39-23-6423122'
//     },
//     {
//         id: 5,
//         name: 'Croix',
//         number: '23-42-4984899'
//     }
// ]
