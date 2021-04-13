require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./models/note');

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
    res.send('<h1>Hello World -- Notes App</h1>')
});

app.get('/api/notes', (req, res) => {
    Note.find({})
        .then(notes => {
            res.json(notes)
        })
});

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
});

// Update
app.put('/api/notes/:id', (req, res, next) => {
    const body = req.body
    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(req.params.id, note, { new: true })
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(error => next(error))
})

// Delete
app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
});


// Create
app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        res.json(savedNote)
    })
});


// Unknown endpoint middleware
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


// Error handler middleware
const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id'})
    }
    next(error)
}
app.use(errorHandler)


// Host
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
