import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)
  const buttonLabel = () => visible ? 'hide' : 'show'

  return (
    <div style={blogStyle}>
      {blog.title} 
      <button onClick={toggleVisibility}>{buttonLabel()}</button>
      <div style={showWhenVisible}>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
      </div>
    </div>
  )
}

export default Blog
