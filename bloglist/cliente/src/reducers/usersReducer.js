import usersService from '../services/users'

const usersReducer = (state = null, action) => {
  switch(action.type) {
  case 'GET_USERS':
    return action.data

  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

export default usersReducer