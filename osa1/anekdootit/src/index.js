import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const setToSelected = (newValue) => {
    setSelected(newValue)
  }
  const addPoints = () => {
    points[selected] += 1
    ReactDOM.render(
      <App anecdotes={anecdotes} points={points} />,
      document.getElementById('root')
    )
  }
  const best = points.indexOf(Math.max(...points))
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>
        
      has {points[selected]} votes
      </p>
      
      <p>
      <Button handleClick={addPoints} text="vote" />
      <Button handleClick={()=>setToSelected(Math.floor(Math.random() * (anecdotes.length) ))}
      text="next anecdote"/>
      </p>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[best]}
      <p>
      has {points[best]} votes
      </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points=Array(anecdotes.length).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById('root')
)