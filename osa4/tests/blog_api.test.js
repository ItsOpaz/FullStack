const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const dummyBlog = {title: 'TEST', author: 'TEST', url: 'https://test.com/', likes: 0}
const emptyLikes = {title: 'TEST', author: 'TEST', url: 'https://test.com/'}
const emptyTitle = {author: 'TEST', url: 'https://test.com/', likes: 0}
const emptyURL = {title: 'TEST', author: 'TEST', likes: 0}


const blogs = [
  { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0, user: '5f049c89e106ab568c056b31' },
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0, user: '5f049c89e106ab568c056b31' },
  { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0, user: '5f049c89e106ab568c056b31' },
  { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0, user: '5f049c89e106ab568c056b31'  },
  { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0, user: '5f049c89e106ab568c056b31'  },
  { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0, user: '5f049c89e106ab568c056b31' }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = (blogs
      .map(blog => new Blog(blog)))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
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

test('blog is added to db', async () => {
  const control = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
  await api
    .post('/api/blogs')
    .send(dummyBlog)
    .expect('Content-Type', /application\/json/)
  const check = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
  expect(check.body).toHaveLength(control.body.length + 1)
})

test('empty likes equals 0', async() => {
  await api
    .post('/api/blogs')
    .send(emptyLikes)
  const check = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(check.body[check.body.length-1].likes).toBe(0)
})

test('empty title results in bad request', async() => {
  await api
    .post('/api/blogs')
    .send(emptyTitle)
    .expect(400)
})

test('empty URL results in bad request', async() => {
  await api
    .post('/api/blogs')
    .send(emptyURL)
    .expect(400)
})


afterAll(() => {
  mongoose.connection.close()
})