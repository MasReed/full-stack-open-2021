if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const PORT = process.env.PORT
const app = express()

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(requestLogger)


// Get Routes
app.get('/', (req, res) => {
    res.send('<h1>Hello World -- Notes App</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({})
        .then(notes => {
            res.json(notes.map(note => note.toJSON()))
        })
})

app.get('/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
    console.log('ignoring api/persons')
    res.status(404).end()
})

// Update
app.put('/api/notes/:id', (req, res, next) => {
    const body = req.body
    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(req.params.id, note, { new: true })
        .then(updatedNote => {
            res.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
})

// Delete
app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            console.log(result)
            res.status(204).end()
        })
        .catch(error => next(error))
})


// Create
app.post('/api/notes', (req, res, next) => {
    const body = req.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note
        .save()
        .then(savedNote => savedNote.toJSON())
        .then(savedAndFormattedNote => {
            res.json(savedAndFormattedNote)
        })
        .catch(error => next(error))
})


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
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)


// Host
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
