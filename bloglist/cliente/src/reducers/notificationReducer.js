const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'NOTIFY':
    return action.data

  default:
    return state
  }
}

export const notificate = text => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: text
    })
  }
}

export default notificationReducer