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

const initState = { //TODO this is wonky af
    user: {
        userName: null,
        userID: null
    },
    places: [],
    currentLocation: "",
    focusedTrip: "",
}
const store = createStore(reducers, initState, applyMiddleware(reduxThunk));
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