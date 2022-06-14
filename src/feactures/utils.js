  export const  mac = (type,...argNames) =>
  (...args) => {
    const action = { type } 
    argNames.forEach( (arg,index)=>{
      action[argNames[index]]=  args[index]
    })
    return action
  }


export const reduceReducers=(...reducers) => (state, action) =>
reducers.reduce((acc,el)=>el (acc,action), state)

export const initialFetching = { loading:"idle", error:null}
export const makeFetchingReducer =  actions => (state = initialFetching, action ) => {
  switch(action.type) {
    case actions[0]: {
      return{...state,loading:"pending"}
      }
      case actions[1]: {
        return { ...state,loading:"succeded"}
    }
    case actions[2]: {
      return{error:action.error,loanding:"rejected"}
    }
    default:{
      return state
    }
  }
}

export const makeSetReducer = actions => (state = "all",action) => {
  switch(action.type) {
    case actions[0]:
    return action.payload
    default:
    return state
  }
}