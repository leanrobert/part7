import React from 'react'
import { useParams } from 'react-router-dom'

const BlogsDetails = ({ blogs, handleLike, handleRemove, user }) => {
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user.username===blog.user.username && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment, index) =>
          <li key={index}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default BlogsDetails