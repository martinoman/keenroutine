import { combineReducers } from 'redux'

const initialState = {
    counter1:0,
    counter2:0,
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER1':
        return Object.assign({}, state, {
            counter1: state.counter1 + action.value
      })
    case 'INCREMENT_COUNTER2':
        return Object.assign({}, state, {
            counter2: state.counter2 + action.value
      })
    default:
      return state
  }
}

const keenRoutineApp = combineReducers({
  reducer
})

export default keenRoutineApp
