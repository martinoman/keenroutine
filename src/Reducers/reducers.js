import { combineReducers } from 'redux'

const initialState = {
    user: {
        userName: null,
        userID: null
    },
    places: [],
    currentLocation: "",
}

const reduxMother = (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_PLACE':
            let newPlaces = [...state.places];
            Object.entries(action.places).forEach((place)=>{
                newPlaces.push({
                    alias: place[0],
                    adress: place[1],
                })
            })
            return Object.assign({}, state,
                {
                    places: newPlaces
                })
        case 'LOAD_USER':
            return Object.assign({}, state,{
                user:{
                    userName: action.user.email,
                    userID: action.user.uid
                    }
                })
        case 'CHANGE_LOCATION':
            return Object.assign({}, state,{
                currentLocation: action.adress
                })
        default:
            return state
    }
}
export default reduxMother
