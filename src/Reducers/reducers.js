// import { combineReducers } from 'redux'

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
                    location: {
                        id: place[1].ID,
                        x: place[1].X,
                        y: place[1].Y,
                    }
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
        console.log(action);
            return Object.assign({}, state,{
                currentLocation: action.location
                })
        default:
            return state
    }
}
export default reduxMother
