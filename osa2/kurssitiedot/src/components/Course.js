import React from 'react'

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
  
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    var sum = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return(
        <h2>total of {sum} exercises</h2>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
      {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    const parts = course.parts
    return (
      <div>
        {parts.map((part,i) =>
        <Part key={part.id} part={part} />
        )}
      </div>
    )
  }

export default Course