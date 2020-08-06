import React, { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Msg from './components/Msg'
import ErrMsg from './components/ErrMsg'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errMsg, setErrMsg] = useState(null)
  const [msg, setMsg] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrMsg('wrong username or password')
      setTimeout(() => {
        setErrMsg(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMsg(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setMsg(null)
        }, 5000)
      })
      .catch(() => {
        setMsg('given values were not valid')
        setTimeout(() => {
          setMsg(null)
        }, 5000)
      })
    blogFormRef.current.toggleVisibility()
  }

  const addLike = async (blog) => {
    blog.likes += 1
    await blogService.update(blog.id, blog)
    setBlogs(blogs.map(x => x.id === blog.id ? { ...x, likes: blog.likes } : x))
  }

  const deleteBlog = async (blog) => {
    if(window.confirm(`Remove blog ${blog.name} by ${blog.author}`))
      await blogService.remove(blog.id)
    setBlogs(blogs.filter(x => x.id !== blog.id))
  }

  if (user === null) {
    return (
      <div>
        <ErrMsg message = {errMsg}/>
        <LoginForm
          handleLogin = {handleLogin}
          setUsername = {setUsername}
          setPassword = {setPassword}
          username = {username}
          password = {password}

        />

      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Msg message = {msg}/>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <p></p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          createBlog = {addBlog}
          setMsg = {setMsg}
        />
      </Togglable>
      <BlogList
        blogs = {blogs}
        addLike = {addLike}
        deleteBlog = {deleteBlog}
        user = {user}
      />

    </div>
  )
}

export default App