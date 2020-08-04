const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
  response.json(result.toJSON())
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id ? user._id : (await User.findOne().toJSON().id),
    likes: body.likes ? body.likes : 0
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }else if (decodedToken.id.toString() !== blog.user.toString()) {
    return response.status(403).end()
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  const updatedBlog = {
    title: body.title ? body.title : blog.title,
    author: body.author ? body.author : blog.author,
    url: body.url ? body.url : blog.url,
    likes: body.likes ? body.likes : blog.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter