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

import config from './DB_CONFIG.js'
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

firebase.initializeApp(config);

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
