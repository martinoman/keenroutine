import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app'
import 'firebase/database';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from './Reducers/reducers'

import {BrowserRouter} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

const initState = {
    user: {
        userName: null,
        userID: null
    },
    places: [],
    currentLocation: "",
    focusedTrip: "",
    finishedLoading: false,
}

const getLocalStorage = () => {
    let state = {...initState}
    let persistedLocation = localStorage.getItem("currentLocation");
    persistedLocation = JSON.parse(persistedLocation);
    if (persistedLocation) {
        state.currentLocation = persistedLocation;
    }
    return state;

}

const store = createStore(reducers, getLocalStorage(), applyMiddleware(reduxThunk));

store.subscribe(() => {
    let state = store.getState();
    let currentLocation = state.currentLocation;
    localStorage.setItem("currentLocation",JSON.stringify(currentLocation));
})
console.log(process.env.REACT_APP_dbconfig);
firebase.initializeApp(JSON.parse(process.env.REACT_APP_dbconfig));

ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
