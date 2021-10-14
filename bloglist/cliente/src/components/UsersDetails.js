import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'

const UsersDetails = ({ users }) => {
  if(!users) {
    return null
  }

  const id = useParams().id
  const user = users.find(user => user.id === id)

  return (
    <Card>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs.map(blog =>
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  )
}

export default UsersDetails
