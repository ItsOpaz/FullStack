import React, { useReducer } from 'react'

const BlogForm = ({ createBlog, setMsg }) => {
  const [newBlog, setNewBlog] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { title:'', author:'', url:'', })

  const handleNewBlogChange = event => {
    const { name, value } = event.target
    setNewBlog({ [name]: value })

  }

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setMsg(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
      title:
          <input
            name="title"
            value={newBlog.title}
            onChange={handleNewBlogChange}
          />
        </div>
        <div>
      author:
          <input
            name="author"
            value={newBlog.author}
            onChange={handleNewBlogChange}
          />
        </div>
        <div>
      url:
          <input
            name="url"
            value={newBlog.url}
            onChange={handleNewBlogChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm