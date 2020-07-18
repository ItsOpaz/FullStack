import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = props => {
  const total=(props.a + props.b + props.c)
  if (total===0){
    return (
      <tbody>
        <tr>
          <td>No feedback given</td>
        </tr>
      </tbody>
    )
  }
  const average=((props.a - props.c)/total).toFixed(1)
  const positive=(props.a/total*100).toFixed(1)

  return (
    <tbody>
      <StatisticLine text="good" value={props.a} />
      <StatisticLine text="neutral" value={props.b} />
      <StatisticLine text="bad" value={props.c} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive + "%"} />
    </tbody>
  )
}

const StatisticLine = props => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <table><Statistics a={good} b={neutral} c={bad} /></table>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)