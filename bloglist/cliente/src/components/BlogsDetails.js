import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup, Card } from 'react-bootstrap'

const BlogsDetails = ({ blogs, handleLike, handleRemove, user, addComment }) => {
  const [comment, setComment] = useState('')

  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const handleNewComment = e => {
    e.preventDefault()
    addComment(blog.id, comment)
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes} <Button onClick={() => handleLike(blog.id)}>like</Button>
      </p>
      <p>added by {blog.user.name}</p>
      {user.username===blog.user.username && <Button onClick={() => handleRemove(blog.id)}>remove</Button>}
      <h3>comments</h3>
      <Form onSubmit={handleNewComment}>
        <Row>
          <Col>
            <Form.Control id="comment" value={comment} onChange={e => setComment(e.target.value)} />
          </Col>
          <Col>
            <Button>add comment</Button>
          </Col>
        </Row>
      </Form>
      <br />
      <Card>
        <ListGroup>
          {blog.comments.map((comment, index) =>
            <ListGroup.Item key={index}>{comment}</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </div>
  )
}

export default BlogsDetails