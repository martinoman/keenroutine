import { combineReducers } from 'redux'

const initialState = {
    user: {
        userName: null,
        userID: null
    },
    places: [],
}

const reduxMother = (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_PLACE':
            let newPlaces = [...state.places];
            let newPlace = Object.entries(action.place);
            newPlaces.push({
                alias: newPlace[0][0],
                adress: newPlace[0][1],
                key: action.key
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
        default:
            return state
    }
}
export default reduxMother
