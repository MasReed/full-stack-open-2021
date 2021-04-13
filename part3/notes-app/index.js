require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./models/note');

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


// Temp data
// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   },
//   {
//     id: 4,
//     content: "From hard coded notes in notes app part 3",
//     date: "2021-04-30T05:31.111Z",
//     important: true
//   }
// ]

app.get('/persons', (req, res) => {
    res.status(404).end();
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World -- Notes App</h1>')
});

app.get('/api/notes', (req, res) => {
    Note
        .find({})
        .then(notes => {
            res.json(notes)
        })
});

app.get('/api/notes/:id', (req, res) => {
    Note
        .findById(req.params.id)
        .then(note => {
            res.json(note)
        })
});

// Not fully implemented
app.put('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find( note => note.id === id )

    console.log('app.put', id)
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter( note => note.id === id );
    res.status(204).end()
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


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
