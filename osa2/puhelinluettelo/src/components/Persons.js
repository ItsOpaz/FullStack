import React from 'react'

const Persons = ({persons, filter}) => {
    return (
        <div>
        {persons.map(item => {
          const check = item.name.toLowerCase()
          if(check.includes(filter)){
            return <p key={item.name}>
            {item.name} {item.number}
            </p>
          }return null
          })}
      </div>
    )
}

export default Persons