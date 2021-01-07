import React, { useEffect, useState } from 'react'
import PersonForm from './PersonForm'
import Contacs from './Contacts'
import Filter from './Filter'
import Network from './Network'
import Message from './Message'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Tero Testiheppu', number: '007-176761', id: 1 }
  ])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [message, setMessage] = useState(null)

  const getPhonebook = () => {
    Network.getAllPersons().then(allPersons => {
      console.log("Got phonebook!", allPersons)
      setPersons(allPersons)
    }).catch(error => console.log('No phonebook: ', error.message))
  }

  useEffect(getPhonebook, [])

  const showMessage = (text) => {
    setMessage({ text: text, isError: false })
  }

  const showError = (text) => {
    setMessage({ text: text, isError: true })
  }

  const hasName = (name) => persons.find(person => person.name === name)

  const addPerson = (event) => {
    event.preventDefault();

    let personInList = hasName(newName)
    if (personInList !== undefined) {
      if (window.confirm(`${newName} is already in phonebook, update number?`)) {

        let updatedPerson = { ...personInList, number: newNum }

        Network.updatePerson(updatedPerson)
          .then((resp) => {
            //console.log(resp)
            setPersons(persons.map(person =>
              person.id === updatedPerson.id ? updatedPerson : person))

            setNewName('')
            setNewNum('')
            showMessage("Updated contact: " + updatedPerson.name + " with new number: " + newNum)
            console.log("Updated contact:", updatedPerson.name, newNum)
          })
          .catch(error => {
            const errMsg = error.response.data.error
            console.log("Problem in updating person: ", errMsg)
            showError(errMsg)
          })

        //showMessage("Updated contact: ", updatedPerson)
        return
      }
    }

    let newPerson = { name: newName, number: newNum }

    Network.createPerson(newPerson)
      .then(() => {
        getPhonebook()
        setNewName('')
        setNewNum('')
        console.log("Added person!", newPerson.name)
        showMessage("Added person: " + newPerson.name)
      })
      .catch(error => {
        const errMsg = error.message
        console.log("Problem creating a contact: ", errMsg)
        showError(errMsg)
      })
  }

  const handleDelPerson = (id) => {
    console.log('Deleting person with id ', id)
    if (window.confirm(`Delete ${personWithId(id).name}?`)) {
      Network.deletePerson(id)
        .then(foo => {
          console.log(foo)
          let personCopy = persons.filter(x => x.id !== id)
          setPersons(personCopy)
          showMessage(`Deleted person ${personWithId(id).name}`)
        })
        .catch(error => {
          const errMsg = error.message
          console.log("Problem in deleting a person: ", errMsg)
          showError(errMsg)
        })
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNewNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const personWithId = (id) => persons.find(person => person.id === id)


  const filteredPersons = (filter, persons) => {
    //console.log("pers", persons)

    if (persons)
      return persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
    return null
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {message && <Message text={message.text} isError={message.isError} />}

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new contact</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNum={newNum}
        handleNewNumChange={handleNewNumChange}
      />

      <h3>Numbers</h3>

      <Contacs persons={filteredPersons(filter, persons)} handleDelPerson={handleDelPerson} />
    </div>

  )

}

export default App