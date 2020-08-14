import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { useSelector, useDispatch } from 'react-redux'
import {
  initializeBlogs, createBlog, likeFor, removeBlog, addComment
} from './reducers/blogReducer'
import { login, loadUser, logout } from './reducers/loginReducer'
import { useParams, Switch, Route, Link } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import './App.css'
import { Table } from 'react-bootstrap'

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/blogs'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

const UsersBlogs = ({ users }) => {
  const id = useParams().id
  const user = users.find(n => n.id === id)
  if(!user){
    return null
  }
  return(
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const BlogInfo = ({ blogs, user }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  var comment

  const newComment = (event) => {
    event.preventDefault()
    if(comment){
      dispatch(addComment(blog, comment))}
  }

  const changeComment = (event) => comment = event.target.value

  if(!blog){
    return null
  }
  return(
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <Link to={blog.url}>
        {blog.url}
      </Link><br/>
      {blog.likes} likes <button onClick={() => dispatch(likeFor(blog))}>like</button><br/>
      added by {blog.user.name}
      {user.username===blog.user.username&&<button onClick={() => dispatch(removeBlog(blog))}>remove</button>}
      <h2>comments</h2>
      <form onSubmit={newComment}>
        <input
          id='comment'
          value={comment}
          onChange={changeComment}
        />
        <button type='submit'>add comment</button>
      </form>
      {blog.comments? blog.comments.map(x => <li key = {x}>{x}</li>) : null }
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  var password
  var username
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }

  const newBlog = (blog) => {
    dispatch(createBlog(blog))
  }

  const changePassword = (event) => password = event.target.value

  const changeUsername = (event) => username = event.target.value

  const handleLogout = () => {
    dispatch(logout())
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username :
            <input
              id='username'
              value={username}
              onChange={changeUsername}
            />
          </div>
          <div>
            password :
            <input
              id='password'
              type='password'
              value={password}
              onChange={changePassword}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  const byBlogs = (b1, b2) => b2.blogs.length - b1.blogs.length

  return (
    <div className='container'>
      <Menu user = {user} handleLogout = {handleLogout}/>
      <h1>blogs</h1>
      <Notification notification={notification} />
      <Switch>
        <Route path='/users/:id'>
          <UsersBlogs users = {users} />
        </Route>
        <Route path='/users'>
          <h1>Users</h1>
          <Table striped>
            <tbody>
              <tr>
                <th></th>
                <th><h2>blogs created</h2></th>
              </tr>
              {users.sort(byBlogs).map(user =>
                <tr key={user.id}>
                  <th><Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link></th>
                  <th>{user.blogs.length}</th>
                </tr>)}
            </tbody>
          </Table>
        </Route>
        <Route path='/blogs/:id'>
          <BlogInfo blogs = {blogs} user = {user}/>
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
            <NewBlog newBlog={newBlog} />
          </Togglable>
          {blogs.sort(byLikes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
            />
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App