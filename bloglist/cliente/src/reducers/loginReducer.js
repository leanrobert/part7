import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data

  case 'LOGOUT':
    return state = null

  default:
    return state
  }
}

export const login = content => {
  return async dispatch => {
    const user = await loginService.login(content)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

export default loginReducer