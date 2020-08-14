import React, { useEffect } from 'react'
import { Blog, UsersBlogs, BlogInfo } from './Blog'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { createBlog, initializeBlogs } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/usersReducer'

const BlogSwitch = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes
  const byBlogs = (b1, b2) => b2.blogs.length - b1.blogs.length

  const newBlog = (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  return(
    <Switch>
      <Route path='/users/:id'>
        <UsersBlogs users = {users} />
      </Route>
      <Route path='/users'>
        <p className='users'>Users</p>
        <Table striped hover>
          <tbody>
            <tr>
              <th></th>
              <th><p className='users'>blogs created</p></th>
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
        <Table striped hover>
          <tbody>
            {blogs.sort(byLikes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
              />
            )}
          </tbody>
        </Table>
      </Route>
    </Switch>)

}

export default BlogSwitch