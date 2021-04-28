const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// Setup Data
const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: 'Tester123',
        author: 'A different Author',
        url: 'http://exampleblogs.com/blog/123',
        likes: 24
    },
    {
        title: 'Test Number Two',
        author: 'An author',
        url: 'http://exampleblogs.com/blog/123',
        likes: 22
    }
]

const User = require('../models/user')
const initialUser = {
    name: 'Test User',
    username: 'Tester0',
    password: 'Secret'
}
let userToken;


// Reset DB fore each test
beforeEach(async () => {
    // blogs
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    // users
    await User.deleteMany({})
    await api
        .post('/api/users')
        .send(initialUser)

    const res = await api
        .post('/api/login')
        .send({ username: initialUser.username, password: initialUser.password})

    userToken = res.body.token
})

describe('GET requests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')

      const contents = response.body.map(r => r.title)

      expect(contents).toContain('Tester123')
    })

    test('a blogs unique identifier property is named `id`', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})


describe('POST requests', () => {

    test('successfully create a new blog post', async () => {

        const newBlog = {
            title: 'A new blog test',
            author: 'blog_api.test.js',
            url: 'someurl.com',
            user: initialUser.username
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userToken}`)
            .send(newBlog)
            .expect(200 || 201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const blogTitles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(blogTitles).toContain('A new blog test')
    })

    test('post request with missing likes defaults to 0', async () => {
        const newBlog = {
            title: 'A new blog test',
            author: 'blog_api.test.js',
            url: 'someurl.com',
            user: initialUser.username
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userToken}`)
            .send(newBlog)
            .expect(200 || 201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const postedNewBlogLikes = response.body[initialBlogs.length].likes

        expect(postedNewBlogLikes).toBe(0)
    })

    test('post request missing title/url gets status code 400 response', async () => {
        const newBlog = {
            author: 'blog_api.test.js',
            user: initialUser.username
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userToken}`)
            .send(newBlog)
            .expect(400)
    })
})



afterAll( () => {
    mongoose.connection.close()
})
