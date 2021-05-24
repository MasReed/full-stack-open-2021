const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 })
  response.json(blogs)
})


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.user.id
  })

  if ((!blog.title) && (!blog.url)) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()
    response.json(savedBlog.toJSON())
  }
})


blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() === request.user.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'unauthorized'}).end()
  }
})


blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})


blogsRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {

  const comment = {
    body: request.body.comment,
    date: new Date()
  }

  const blogToComment = await Blog.findById(request.params.id)

  blogToComment.comments.push(comment)
  
  const savedBlog = await blogToComment.save()

  response.status(200).json(savedBlog.toJSON()).end()
})

module.exports = blogsRouter
