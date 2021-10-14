import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog} style={{ maxWidth: '50%' }}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">author</Form.Label>
          <Col sm="10">
            <Form.Control
              id='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">title</Form.Label>
          <Col sm="10">
            <Form.Control
              id='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">url</Form.Label>
          <Col sm="10">
            <Form.Control
              id='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </Col>
        </Form.Group>
        <Button id="create">create</Button>
      </Form>
    </div>
  )
}

export default NewBlog