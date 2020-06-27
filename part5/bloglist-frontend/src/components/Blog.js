import React, { useState } from 'react'

const Blog = ({ blog, username, like, remove }) => {
  const [visible, setVisible] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showIfCreator = { display: username === blog.user.username ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)
  const buttonLabel = () => visible ? 'hide' : 'show'

  return (
    <div style={blogStyle}>
      {blog.title} 
      <button onClick={toggleVisibility}>{buttonLabel()}</button>
      <div style={showWhenVisible}>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={like}>like</button></p>
        <p style={showIfCreator}><button onClick={remove}>remove</button></p>
      </div>
    </div>
  )
}

export default Blog
