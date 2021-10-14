import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import UsersData from './components/UsersData'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import storage from './utils/storage'
import { initializeBlogs, createBlogReducer, updateBlogReducer, deleteBlogReducer, commentBlogReducer } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './reducers/loginReducer'
import { notificate } from './reducers/notificationReducer'
import UsersDetails from './components/UsersDetails'
import BlogsDetails from './components/BlogsDetails'

import { Form, Button, Nav, Table } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const { blogs, user, notification, users } = useSelector(state => state)

  const notifyWith = (message, type='success') => {
    dispatch(notificate({ message, type }))
    setTimeout(() => {
      dispatch(notificate(null))
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({ username, password }))
      setUsername('')
      setPassword('')
      const userStore = storage.loadUser()
      notifyWith(`${userStore.name} welcome back!`)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      dispatch(createBlogReducer(blog))
      blogFormRef.current.toggleVisibility()
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    dispatch(updateBlogReducer(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(deleteBlogReducer(id))
    }
  }

  const addComment = async (id, comment) => {
    dispatch(commentBlogReducer(id, comment))
  }

  const handleLogout = () => {
    dispatch(logout())
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div className="container">
        <h2 className="text-center">Login to application</h2>

        <Notification notification={notification} />

        <div style={{ padding: '60px 0' }}>
          <Form onSubmit={handleLogin} style={{ maxWidth: '320px', margin: '0 auto' }}>
            <Form.Group size="lg">
              <Form.Label>username</Form.Label>
              <Form.Control
                type='text'
                id='username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </Form.Group>
            <Form.Group size="lg">
              <Form.Label>password</Form.Label>
              <Form.Control
                type='password'
                id='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Form.Group>
            <Button block type="submit" size="lg" id='login'>login</Button>
          </Form>
        </div>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className="container">
      <Router>
        <Nav variant='tabs' defaultActiveKey='/'>
          <Nav.Item>
            <Nav.Link href='/' as='div'><Link to="/">blogs</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link to='/users' as='div'><Link to="/users">users</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as='div'>
              {user.name} logged in <Button variant="danger" onClick={handleLogout}>logout</Button>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Notification notification={notification} />

        <Switch>
          <Route path="/blogs/:id">
            <BlogsDetails handleLike={handleLike} handleRemove={handleRemove} user={user} blogs={blogs} addComment={addComment}/>
          </Route>
          <Route path="/users/:id">
            <UsersDetails users={users} />
          </Route>
          <Route path="/users">
            <h2>Users</h2>
            <Table striped>
              <tbody>
                <tr>
                  <td></td>
                  <td><b>blogs created</b></td>
                </tr>
                {users.map(user =>
                  <UsersData
                    key={user.id}
                    user={user}
                  />
                )}
              </tbody>
            </Table>
          </Route>
          <Route path="/">
            <h2>Blogs</h2>
            <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
              <NewBlog createBlog={createBlog} />
            </Togglable>
            {blogs.sort(byLikes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App