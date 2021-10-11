import axios from 'axios'
import storage from '../utils/storage'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  storage.saveUser(response.data)
  return response.data
}

export default { login }