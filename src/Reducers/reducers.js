import { combineReducers } from 'redux'

const initialState = {
    user: {
        userName: "",
        userId: ""
    },
    places: [],
}

const reduxMother = (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_PLACE':
            return Object.assign({}, state,
                {
                    places: [...state.places, action.place]
                })
        case 'LOAD_USER':
            return Object.assign({}, state,{
                user:{
                    userName: action.user.email,
                    userID: action.user.uid
                    }
                })
        default:
            return state
    }
}

// const user = (state=initialState, action) => {
//     switch (action.type) {
//         case 'LOAD_USER':
//             return {
//                     userName: action.user.email,
//                     userID: action.user.uid
//                 }
//         default:
//             return state
//     }
// }
//
// const keenRoutineApp = combineReducers({
//     user,
//     places
// })

export default reduxMother
