const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Note = require('../models/note')
const initialNotes = [
    {
        content: 'HTML is easy',
        date: new Date(),
        important: true,
    },
    {
        content: 'Steve',
        important: true,
        date: new Date()
    }
]

// reset database structure
beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(initialNotes[0])
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
})



test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('All notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note is within returned notes', async () => {
    const res = await api.get('/api/notes')

    const contents = res.body.map(r => r.content)
    expect(contents).toContain('HTML is easy')
})



afterAll( () => {
    mongoose.connection.close()
})
