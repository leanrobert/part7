import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Blog = ({ blog }) => {
  return (
    <Card className='blog'>
      <div>
        <Link to={`/blogs/${blog.id}`}><i>{blog.title}</i> by {blog.author}</Link>
      </div>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired
}

export default Blog