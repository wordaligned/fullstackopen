import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => (
    axios
        .get(baseUrl)
        .then(response => response.data)
)

const create = person => (
    axios
        .post(baseUrl, person)
        .then(response => response.data)
)

const update = (id, person) => (
    axios
        .put(`${baseUrl}/${id}`, person)
        .then(response => response.data)
)

const remove = person_id => (
    axios
        .delete(`${baseUrl}/${person_id}`)
        .then(getAll)
)

export default { getAll, create, update, remove }
