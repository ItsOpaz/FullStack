const AddPerson = ({persons, newName, newNumber, setNewName, setNewNumber,setPersons}) => {
  const nameCheck = persons.filter(function(person){
      return person.name === newName
    })
    if (nameCheck.length === 0){
      const personObject = {
        name: newName, number: newNumber
      }
    
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }else{
      window.alert(`${newName} is already added to phonebook`);
    }
}

export default AddPerson