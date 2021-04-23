const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'tester',
            name: 'Test User',
            password: 'secret password'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode if username already exists', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'shhhhh'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        console.log(result.body)
        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})
