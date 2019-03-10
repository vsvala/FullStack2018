import axios from 'axios'
const baseUrl =  'http://localhost:3001/api/blogs'


let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log(token,'token asetettu')
}

//Haetaan kaikki blogit tietokannsta
const getAll = async() => {
  try {
    const response = await axios.get(baseUrl)
    return  response.data
  } catch (error) {
    console.log('error getting all blogs from back')
    return { error: 'Something went wrong!' }
  }
}

// luo uuden käyttäjän jos token ok
//asettaa moduulin tallessa pitämän tokenin Authorization-headeriin ja antaa axiosille metodin post kolmantena parametrina.
const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  // lähetetään uusi blogiolio ja token POST pyynnöllä tietkantaan
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    console.log('error posting blog to back')
    return { error: 'Something went wrong!' }
  }
}


//muokkaus
const update =async (id, newObject) => {
  console.log(id, newObject,'updatefromservice')
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
  } catch (error) {
    console.log('error updating blog to back')
    return { error: 'Something went wrong!' }
  }
}//Uusi muistiinpano on siis response-olion kentän data arvona



//Poiistaa luodun muistiinpanon jos token ok
const deleteOne = async(id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  console.log('deletoidaanblogi', id)
  try {
    const response= await axios.delete(`${baseUrl}/${id}`,config)
    return response.data
  } catch (error) {
    console.log('error deleting blog from back')
    return { error: 'Something went wrong!' }
  }
}
///////////////COMMENTS///////////////////////

const getAllComments = async(id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}/comments`)
    console.log(response.data,'responseeeeeeeeeeeeeeeeeeedtaaaaaaaaaaaaaaaaaaaaaa')
    //state.courses.filter(c => c.course_id !== action.data.id)

    const res=response.data.filter(c => c.id===id)
    console.log(res,'responseeeeeeeeeeeeeeeeeeedtahhhhhhhhhhhhhhhhhha')

    return  response.data
  } catch (error) {
    console.log('error getting all blogs from back')
    return { error: 'Something went wrong!' }
  }
}


const createComment=async (newComment, id) => {
  // lähetetään uusi commentolio ja token POST pyynnöllä tietkantaan
  try {
    const response = await axios.post(`${baseUrl}/${id}/comments`, newComment)
    return response.data
  } catch (error) {
    console.log('error posting comment to back')
    return { error: 'Something went wrong!' }
  }
}

export default { getAll, create, update, setToken, deleteOne, createComment,getAllComments }