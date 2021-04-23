const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users)
})


usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        name: body.name,
        username: body.username,
        passwordHash
    })

    if ((!newUser.username) && (!newUser.password)) {
        response.status(400).end()
    } else if (body.passwordHash < 2) {
        response.status(400).end()
    } else {
        const savedUser = await newUser.save()
        response.json(savedUser.toJSON())
    }
})

module.exports = usersRouter
