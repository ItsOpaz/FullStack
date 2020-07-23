import React from 'react'
import personService from '../services/persons'

const PersonList = ({persons, filter,setPersons, setNotification, setErrorMessage}) => {

  const remove = (item) => {
    personService
      .remove(item.id)
      .then(()=>{
        setNotification(
          `Deleted ${item.name}`
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
    .catch(error => {
      setErrorMessage(
        `Information of ${item.name} has already been removed from server`
      )

    })
  }
    return (
        <div>
        {persons.map(item => {
          const check = item.name.toLowerCase()
          if(check.includes(filter)){
            return <p key={item.name}>
              {item.name} {item.number}
              <button onClick = {() => {
                if(window.confirm(`delete ${item.name} ?`)){
                  remove(item)
                  }}}>
                  delete
              </button>
            </p>
          }return null
          })}
      </div>
    )
}

export default PersonList