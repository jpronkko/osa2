import axios from 'axios'
const baseUrl = 'https://localhost:3001/persons'
//const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = 'https://immense-eyrie-58054.herokuapp.com/api/persons'
//const baseUrl = '/api/persons'

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request
        .then(response => response.data)
}

const createPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request
        .then(response => response.data)
}

const updatePerson = (person) => {
    const putUrl = `${baseUrl}/${person.id}`
    console.log("Put URL", putUrl)
    const request = axios.put(putUrl, person)
    return request
        .then(response => {
            return response.data
        })
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
        .then(response => response.data)
}

export default { getAllPersons, createPerson, updatePerson, deletePerson }