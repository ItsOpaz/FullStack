import personService from '../services/persons'

const AddPerson = ({persons, newName, newNumber, setNewName, setNewNumber,setPersons, setNotification, setErrorMessage}) => { 
  const nameCheck = persons.filter(function(person){
      return person.name === newName
    })
    if (nameCheck.length === 0 && newName !== ''){
      const personObject = {
        name: newName, number: newNumber
      }
      personService
        .create(personObject)
        .then(() => {
          setNotification(
            `Added '${personObject.name}'`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotification(null)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {setErrorMessage(null)}, 4000)
        })
      
    }else if(nameCheck.length !== 0 && newName !== ''){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(n=>n.name === newName)
        const changedUnit = {...person, number: newNumber}
        personService
          .update(person.id, changedUnit)
          .then(()=>{
            setNotification(
              `Updated '${changedUnit.name}'`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            personService
            .getAll()
            .then(response => {
            setPersons(response.data)
          })
      }, [])

      }
    }else{
      window.alert('name is empty')
    }
}

export default AddPerson