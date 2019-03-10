import axios from 'axios'
const baseUrl =  'http://localhost:3001/api/users'

//gets all users
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

//create new user
const create = async (newObject) => {
  //console.log(newObject, 'axios')
  const response = await axios.post(baseUrl, newObject)
  return response.data
}


//update user
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}//Uusi muistiinpano on siis response-olion kentän data arvona


//delete user
const deleteOne = async(id) => {
  const response= await axios.delete(`${baseUrl}/${id}`)
  return response.data

}

export default { getAll, create, update, deleteOne }