import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'
//const baseUrl = '/api/login'



const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (error) {

    return { error: 'Username or password is incorrect!' }
  }
}

export default { login }
