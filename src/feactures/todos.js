 import { combineReducers } from "redux"
import { makeFetchingReducer,makeSetReducer, reduceReducers} from "./utils"
 import {mac} from "./utils.js"






 export const setPending=() => mac("todos/pending") 
 
 const sf= mac("todos/fulfilled", "payload")
 
  export const setFulfilled = mac("todos/fullfillded","payload")
 export const setError = mac("todo/error","error")
 export const setComplete = mac("todo/complete","payload")
 export const setFilter =mac("filter/set","payload")
 
export const fetchThunk = () =>   async dispatch => {
  dispatch({type:setPending()})
   try { 
     const response =  await  fetch("https://jsonplaceholder.typicode.com/todos")
     const data = await response.json()
     const todos = data.slice(0, 10)
     dispatch(setFulfilled(todos))
  } catch(e) {
    dispatch(setError(e.message))
  }
 }
 export const crudReducer= (state= [], action) => {
  switch(action.type) {
    case"todos/fulfilled":{
      return action.payload
    }
    case "todo/add" : {
      return state.concat({...action.payload })
      
    }
    case "todo/complete": {
      const newEntities = state.map(entity => {
        if (entity.id === action.payload.id) {
          return {
            ...entity,
            completed: !entity.completed
          } 
        }
        return entity
      })
      return newEntities
    }
    default:
      return state
  }
}
 

export const filterReducer= makeSetReducer(["filter/set"])

export const fetchingReducer = makeFetchingReducer([
  "todos/pending",
  "todos/fulfilled",
  "todos/rejected",
])
const fullfilldedReducer= makeSetReducer(["todos/fulfilled"])
export const todosReducer = reduceReducers(crudReducer,fullfilldedReducer) 


export const reducer = combineReducers({
  todos : combineReducers({
    entities: todosReducer,
    status: fetchingReducer,

  }),
  filter: filterReducer,
})

 export const selectTodos = state  => {
  const {todos:{entities}, filter} = state
  
  if (filter ==="complete") {
    return entities.filter(todos =>todos.completed)
  }
  if (filter ==="incomplete") {
    return entities.filter(todos => !todos.completed)
  }
  
  return entities
  
}

export const selectStatus = state => state.todos.status
