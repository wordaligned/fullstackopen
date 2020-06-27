import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async toCreate => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, toCreate, config)
  return response.data
}

const remove = async toRemove => {
  const config = { headers: { Authorization: token } }
  await axios.delete(`${baseUrl}/${toRemove.id}`, config)
}

const like = async (toLike) => {
  const toPut = Object.assign(toLike,
    { likes: toLike.likes + 1, user: toLike.user.id })
  const response = await axios.put(`${baseUrl}/${toLike.id}`, toPut)
  return response.data
}

export default { setToken, getAll, create, remove, like }