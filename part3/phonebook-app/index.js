require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Contact = require('./models/contact');

const PORT = process.env.PORT;
const app = express();

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(requestLogger)


// Get Routes
app.get('/', (req, res) => {
    res.send('<h1>Phonebook App</h1>');
});

app.get('/api/persons', (req, res) => {
    Contact
        .find({})
        .then(contacts => {
            res.json(contacts)
        })
        .catch(error => next(error))
});

app.get('/api/persons/:id', (req, res) => {
    Contact
        .findById(req.params.id)
        .then(person => {
            res.json(person)
        })
        .catch(error => next(error))
});

// Delete Route
app.delete('/api/persons/:id', (req, res, next) => {
    Contact
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
});

// Create Route
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

    contact
        .save()
        .then(savedContact => {
            res.json(savedContact)
        })
        .catch(error => next(error))
});

// Update Route
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const contact = {
        name: body.name,
        number: body.number
    }

    Contact
        .findByIdAndUpdate(req.params.id, contact, { new: true })
        .then(updatedContact => {
            res.json(updatedContact)
        })
        .catch(error => next(error))
})


//
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint);


// errorHandler
const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id'})
    }
    next(error)
}
app.use(errorHandler)



//
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})
