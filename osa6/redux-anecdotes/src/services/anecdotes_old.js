import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }
const create = async (content) => {
  const newObject = {
    content,
    votes: 0
  }
  // const response = await axios.post(url, { content, important: false })
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

// const create = (content) => {
//   const newObject = {
//     content,
//     votes: 0
//   }
//   const request = axios.post(baseUrl, newObject)
//   return request.then(response => response.data)
// }

const update = (id, changedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, changedObject)
  return request.then(response => response.data)
}

export default {
  getAll, create, update
}
