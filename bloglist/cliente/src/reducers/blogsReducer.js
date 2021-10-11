import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]

  case 'INIT_BLOGS':
    return action.data

  case 'UPDATE_BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)

  case 'DELETE_BLOG':
    return [...state.filter(blog => blog.id !== action.data)]

  default:
    return state
  }
}

export const createBlogReducer = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const updateBlogReducer = content => {
  return async dispatch => {
    const updatedBlog = await blogService.update(content)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlogReducer = content => {
  return async dispatch => {
    await blogService.remove(content)
    dispatch({
      type: 'DELETE_BLOG',
      data: content
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogsReducer