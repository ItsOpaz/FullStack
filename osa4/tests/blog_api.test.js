const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { result } = require('lodash')
const h = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = (h.users
      .map(user => new User(user)))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = (h.blogs
      .map(blog => new Blog(blog)))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('blog tests', () => {
  test('returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('id field identifies object', async () => {
    const result = await api
        .get('/api/blogs/5a422a851b54a676234d17f7')
        .expect('Content-Type', /application\/json/)
    expect(result.body.id).toBeDefined()
  })
  
  test('adding to db', async () => {
    const control = await h.blogsInDb()
    await api
      .post('/api/blogs')
      .send(h.dummyBlog)
      .expect('Content-Type', /application\/json/)
    const check = await h.blogsInDb()

    expect(check).toHaveLength(control.length + 1)
  })
  
  test('empty likes equals 0', async() => {
    await api
      .post('/api/blogs')
      .send(h.emptyLikes)
    const check = await h.blogsInDb()
    expect(check[check.length-1].likes).toBe(0)
  })
  
  test('empty title results in bad request', async() => {
    await api
      .post('/api/blogs')
      .send(h.emptyTitle)
      .expect(400)
  })
  
  test('empty URL results in bad request', async() => {
    await api
      .post('/api/blogs')
      .send(h.emptyURL)
      .expect(400)
  })
  
  test('updatingworks', async() => {
    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .send({author: "test author"})
    const check = await api
      .get('/api/blogs/5a422a851b54a676234d17f7')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(check.body).toEqual(h.controlBlog)
  })
  
  test('deleting returns code 204 and one blog is removed', async() => {
    const control = await h.blogsInDb()
    await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .expect(204)
    const check = await h.blogsInDb()
    expect(check).toHaveLength(control.length - 1)
  })
})

describe('user tests', () => {
  test('returned correctly', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('adding works', async () => {
    const control = await h.usersInDb()
    await api
      .post('/api/users')
      .send(h.dummyUser)
      .expect('Content-Type', /application\/json/)
    const check = await h.usersInDb()
    expect(check).toHaveLength(control.length + 1)
  })
  test('username is already used', async () => {
    const control = await h.usersInDb()
    const result = await api
      .post('/api/users')
      .send(h.usernameUsed)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('`username` to be unique')
    const check = await h.usersInDb()
    expect(check).toHaveLength(control.length)
  })
  test('invalid password', async () => {
    await api
      .post('/api/users')
      .send(h.invalidPassword)
      .expect(400)
  })
  test('empty password', async () => {
    await api
      .post('/api/users')
      .send(h.emptyPassword)
      .expect(400)
  })

})

afterAll(() => {
  mongoose.connection.close()
})