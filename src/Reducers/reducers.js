// import { combineReducers } from 'redux'

const initialState = {
    user: {
        userName: null,
        userID: null
    },
    places: [],
    currentLocation: "",
    focusedTrip: "",
    loggedIn: false,
}

const reduxMother = (state=initialState, action) => {
    switch (action.type) {
        case 'ADD_PLACE':
            let newPlaces = [...state.places];
            Object.entries(action.place).forEach((place)=>{
                console.log(place);
                newPlaces.push({
                    alias: place[0],
                    location: {
                        id: place[1].ID,
                        x: place[1].X,
                        y: place[1].Y,
                    },
                    key: action.key,
                })
            })
            return Object.assign({}, state,
                {
                    places: newPlaces
                })
        case 'REMOVE_PLACE':
            let newPlaces2 = [...state.places]
            for (var i = 0; i < newPlaces2.length; i++) {
                if (newPlaces2[i].key === action.key) {
                    newPlaces2.splice(i, 1);
                }
            }
            return Object.assign({}, state,
                {
                    places: newPlaces2,
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
                currentLocation: action.location
                })
        case 'FOCUS_TRIP':
            return Object.assign({}, state,{
                focusedTrip: action.trip
                })
        case 'CLEAR_STATE':
            return initialState
        default:
            return state
    }
}
export default reduxMother
