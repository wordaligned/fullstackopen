import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
        title
          <input
            type="text" value={title} name="Title"
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
        author
          <input
            type="text" value={author} name="Author"
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
        url
          <input
            type="text" value={url} name="Url"
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
