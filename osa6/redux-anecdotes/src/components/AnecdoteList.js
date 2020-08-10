import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const filteredContent = anecdotes.filter(x => {
    if(x.content.toLowerCase().includes(filter)){
      return x
    }return null
  })
  const vote = (id, content) => {
    dispatch(voteFor(id))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }
  
  return (
    <div>
    {filteredContent.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
    </div>
    ) 
}

export default AnecdoteList