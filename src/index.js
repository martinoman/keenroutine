import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app'
import 'firebase/database';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './Reducers/reducers'

import config from './DB_CONFIG.js'
import {BrowserRouter} from 'react-router-dom'


const store = createStore(reducers);
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
