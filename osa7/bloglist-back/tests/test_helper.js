const User = require('../models/user')
const Blog = require('../models/blog')

const controlBlog = { id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'test author', url: 'https://reactpatterns.com/', likes: 7}
const dummyBlog = {title: 'TEST', author: 'TEST', url: 'https://test.com/', likes: 0, user: '5f2973f6604b0f17281e064f' }
const emptyLikes = {title: 'TEST', author: 'TEST', url: 'https://test.com/', user: '5f2973f6604b0f17281e064f' }
const emptyTitle = {author: 'TEST', url: 'https://test.com/', likes: 0, user: '5f2973f6604b0f17281e064f' }
const emptyURL = {title: 'TEST', author: 'TEST', likes: 0, user: '5f2973f6604b0f17281e064f' }

const blogs = [
  { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0},
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0, user: '5f2973f6604b0f17281e064f' },
  { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0, user: '5f2973f6604b0f17281e064f' },
  { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0, user: '5f2973f6604b0f17281e064f'  },
  { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0, user: '5f2973f6604b0f17281e064f'  },
  { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0, user: '5f2973f6604b0f17281e064f' }
]

const controlUser =  {username: 'cant see me', password: 'salasana2'}
const dummyUser = {username: 'TEST2', name: 'test2', password: 'validpassword'}
const usernameUsed = {username: 'niilo22_fani', name: 'test', password: 'validpassword'}
const invalidPassword = {username: 'invalidPassword', name: 'test', password: 'as'}
const emptyPassword = {username: 'emptyPassword', name: 'test'}

const users = [
  {_id: '5f049c89e106ab568c056b31', username: 'niilo22_fani', name: 'Mikael Kosola', password: 'salasana'},
  {username: 'cant see me', name: 'John Cena', password: 'salasana2'},
  {username: 'xxx_test_xxx', name: 'Patient 0', password: 'salasana3'}
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  controlBlog, dummyBlog, emptyLikes, emptyTitle, emptyURL, blogs,
  controlUser, emptyPassword, dummyUser, invalidPassword, usernameUsed, users,
  usersInDb, blogsInDb

}