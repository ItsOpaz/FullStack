import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog, getConfig())
  return request.then(response => response.data)
}

const update = async (blog) => {
  const object = await axios.get(`${baseUrl}/${blog.id}`)
  const newObject = { ...object.data, likes: object.data.likes + 1 }
  await axios.put(`${baseUrl}/${blog.id}`, newObject)
  const updated = await axios.get(`${baseUrl}/${blog.id}`)
  return updated.data
}

const remove = (id) => {
  axios.delete(`${baseUrl}/${id}`, getConfig())
  return id
}

const postComment = (id, comment) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, { content: comment })
  return request.then(response => response.data)
}


export default { getAll, create, update, remove, postComment }