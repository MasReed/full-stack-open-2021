const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let persons = [
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

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const contact = persons.find( person => person.id === id );

    if (contact) {
        res.json(contact)
    } else {
        res.status(404).end()
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter( person => person.id !== id );
    res.status(204).end()

});

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map( n => n.id) )
      : 0
    return maxId + 1
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    // Check for required content
    if ((!body.name) || (!body.number)) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    // Check for duplicate contact
    if (persons.some( person => person.name === body.name)) {
        return res.status(400).json({
            error: 'This person already exists.'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    res.json(person)
});

const unknownEndpoint = (req, res) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndopoint);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})
