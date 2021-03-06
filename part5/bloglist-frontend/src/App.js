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

  const mostLikesFirst = (a, b) => b.likes - a.likes

  useEffect(() => {
    blogService.getAll().then(blogs => { setBlogs(blogs.sort(mostLikesFirst)) })
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
    <form id='loginForm' onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text' value={username} id='username'
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          type='password' value={password} id='password'
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit" id='login-button'>login</button>
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
      const user = await loginService.login({ username, password })
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

  const handleLike = async (blog) => {
    const liked = await blogService.like(blog)
    setBlogs(
      blogs
        .map(blog => blog.id === liked.id ? liked : blog)
        .sort(mostLikesFirst)
    )
  }

  const handleRemove = async (toRemove) => {
    if (window.confirm(`Remove ${toRemove.title}?`)) {
      await blogService.remove(toRemove)
      setBlogs(blogs.filter(blog => blog.id !== toRemove.id))
    }
  }

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog => (
        <Blog key={blog.id}
          blog={blog}
          username={user.username}
          like={() => handleLike(blog)}
          remove={() => handleRemove(blog)} />
      ))}
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