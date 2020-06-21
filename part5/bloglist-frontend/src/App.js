import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => (
  message === null ? null : <div className="notification">{message}</div>
)

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => { setBlogs(blogs) })
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('blogListUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username 
        <input 
          type="text" value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input 
          type="password" value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('blogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = { title, author, url }
      const created = await blogService.create(newBlog)
      setBlogs(blogs.concat(created))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setErrorMessage('Unauthorized')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('blogListUser')
    setUser(null)
  }

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  const newBlogForm = () => (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={createBlog}>
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

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? loginForm() : 
        <div>
          {blogList()}
          {newBlogForm()}
        </div>}
    </div>
  )
}

export default App