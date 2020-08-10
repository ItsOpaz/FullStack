import anecdotesService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.update.id
      const voted = state.find(n => n.id === id)
      const updated = {...voted, votes: voted.votes + 1}
      return state.map(x => x.id !== id ? x : updated).sort(function(a, b){
        return b.votes - a.votes
      })
    case 'NEW_ANECDOTE':
      return [...state, action.newAnecdote]
    case 'INIT_ANECDOTES':
      return action.data.sort(function(a, b){
        return b.votes - a.votes
      })
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteFor = (id) => {
  return async dispatch => {
    const update = await anecdotesService.update(id)
    dispatch({
      type: 'VOTE',
      update
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      newAnecdote
    })
  }
}

export default anecdoteReducer