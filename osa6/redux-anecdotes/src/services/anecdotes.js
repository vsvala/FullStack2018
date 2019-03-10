import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content,writer) => {
  const newObject = {
    content,
    author:writer,
    votes: 0
  }
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = (id, changedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, changedObject)
  return request.then(response => response.data)
}

export default {
  getAll, create, update
}
