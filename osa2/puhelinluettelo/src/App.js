import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newNumber, setNewNumber ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ filter, setFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase())

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
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
      />
      <h2>Numbers</h2>
      <Persons
        filter = {filter}
        persons = {persons}
      />
    </div>
  )

}

export default App