import firebase from "firebase/app";

export const logout = () => async () => {
    firebase.auth().signOut()
    .catch((err) => {
        console.log("sign out falied:");
        console.log(err);
    })
}

export const setIndex = (index, key, userID) => async dispatch => {
    let db = firebase.database().ref().child('users').child(userID);
    db.child(key).child("location").child("Index").set(index);
    dispatch({
        type: "SET_INDEX",
        key: key,
        index: index,
    });
}

export const changeLocation = location => async dispatch => dispatch({
  type: 'CHANGE_LOCATION',
  location: location
})

export const focusTrip = trip => async dispatch => dispatch({
  type: 'FOCUS_TRIP',
  trip: trip
})

export const loadUser = user => async dispatch => dispatch({
  type: 'LOAD_USER',
  user: user
})

export const finishedLoading = () => async dispatch => dispatch({
    type: 'FINISHED_LOADING',
    finishedLoading: true
});

export const removePlace = (key, userID) => async dispatch => {
    let db = firebase.database().ref().child('users').child(userID);
    db.child(key).remove();
    dispatch({
        type: 'REMOVE_PLACE',
        key: key,
    })
}

export const addPlace = (place, userID) => async () => {
    let db = firebase.database().ref().child('users').child(userID);
    db.push().set(place);
}

export const clearState = () => async dispatch => dispatch({
    type: "CLEAR_STATE",
})

export const loadAllPlaces = (userID) => async dispatch => {
    let db = firebase.database().ref().child('users').child(userID);
    db.on('value', snap => {
        let places = snap.val();
        for (var key in places) {
            if (places.hasOwnProperty(key)) {
                let value = places[key];
                dispatch({
                    type: 'ADD_PLACE',
                    location: value.location,
                    key: key,
                });
            }
        }
        dispatch({
            type: 'FINISHED_LOADING',
            finishedLoading: true,
        });
    })
}
