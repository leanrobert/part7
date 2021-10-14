import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

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
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user.username===blog.user.username && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      <h3>comments</h3>
      <form onSubmit={handleNewComment}>
        <input id="comment" value={comment} onChange={e => setComment(e.target.value)} /><button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) =>
          <li key={index}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default BlogsDetails