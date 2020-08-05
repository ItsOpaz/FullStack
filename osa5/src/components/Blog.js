import React, {useState} from 'react'
import '../App.css'

const Blog = ({ blog }) => {
  const [full, setFull] = useState(false)

  const toggleFull = () => setFull(!full)

  return(
    full
      ?
      <div className = "Blog">
        {blog.title} {blog.author} 
        <button onClick={()=> toggleFull()}>hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes} <button>like</button><br/>
        {blog.user.username}
      </div>
      :
      <div className = "Blog">
      {blog.title} {blog.author} 
      <button onClick={()=> toggleFull()}>show</button>
    </div>
    )

}

export default Blog
