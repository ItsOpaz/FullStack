import React from 'react'
import AddPerson from './AddPerson'

const PersonForm = ({ handleNameChange, handleNumberChange, newNumber, newName,
   setNewName, setNewNumber, persons, setPersons, setNotification, setErrorMessage}) =>{
    return(
    <form onSubmit={(event) => {event.preventDefault(); AddPerson({persons, newName, newNumber, setNewName,
     setNewNumber, setPersons, setNotification, setErrorMessage})}}>
      <div>
        name:<input
          value={newName} 
          onChange={handleNameChange}
      /></div>
      <div>
        number:<input
          value={newNumber} 
          onChange={handleNumberChange}
      /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm