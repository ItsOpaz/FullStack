import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newNumber, setNewNumber ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase())

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notification}/>
      <ErrorMessage message = {errorMessage}/>
      <Filter 
        handleFilterChange = {handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}
        persons = {persons} setPersons = {setPersons}
        newName = {newName} setNewName = {setNewName}
        newNumber = {newNumber} setNewNumber = {setNewNumber}
        setNotification = {setNotification} setErrorMessage = {setErrorMessage}
      />
      <h2>Numbers</h2>
      <PersonList
        filter = {filter}
        persons = {persons}
        setPersons = {setPersons}
        setNotification = {setNotification}
        setErrorMessage = {setErrorMessage}
      />
    </div>
  )

}

export default App