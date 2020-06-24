import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => (
  message === null ? null : <div className="notification">{message}</div>
)

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const blogFormRef = useRef()

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
  
  const blogForm = () => (
    <Togglable buttonLabel="add blog" ref={blogFormRef}>
      <NewBlogForm createBlog={createBlog} />
    </Togglable> 
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
      setMessage('Wrong credentials')
      setTimeout(() => { setMessage(null )}, 5000)
    }
  }

  const createBlog = async (toCreate) => {
    try {
      blogFormRef.current.toggleVisibility()
      const created = await blogService.create(toCreate)
      setBlogs(blogs.concat(created))
      setMessage(`Created blog: "${created.title}"`)
    } catch (exception) {
      setMessage('Blog creation failed')
    }
    setTimeout(() => { setMessage(null) }, 5000)
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

  return (
    <div>
      <Notification message={message} />
      {user === null ? loginForm() : 
        <div>
          {blogList()}
          {blogForm()}
        </div>}
    </div>
  )
}

export default App