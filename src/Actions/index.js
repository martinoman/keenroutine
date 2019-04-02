import firebase from "firebase/app";

export const logout = () => async () => {
    firebase.auth().signOut()
    .catch((err) => {
        console.log("signOut falied:");
        console.log(err);
    })
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

export const subscribeToDB = (userID) => async dispatch => {
    let db = firebase.database().ref().child('users').child(userID);
    db.on('child_added', snap => {
        let place = snap.val();
        let key = snap.key;
        dispatch({
            type: 'ADD_PLACE',
            place: place,
            key: key,
        });
    })
}
