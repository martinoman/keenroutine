import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Switch, Router, Route } from 'react-router-dom'

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";
import {loadUser, loadPlaces} from "./Actions/index";

import './App.css';

import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import ManagePlaces from "./Pages/ManagePlaces";


class App extends Component {
    constructor(){
        super();
        this.authChange = this.authChange.bind(this);
        firebase.auth().onAuthStateChanged(this.authChange);
    }

    authChange(user){
        this.props.loadUser(user);
        let db = firebase.database().ref().child('users');
        db.on('child_added', snap => {
            this.props.loadPlaces(snap.val());
        })
    }

  render() {
    return (
      <div className="App">
        	<Switch>
                <Route exact path="/signup" render={(props) => <SignUp {...props}/>}/>
                <Route exact path="/login" render={(props) => <Login {...props}/>}/>
                <Route exact path="/" render={(props) => <Login {...props}/>}/>
                <Route exact path="/manage_places" render={(props) => <ManagePlaces {...props}/>}/>
        	</Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        places: state.places,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        loadUser: (user) => dispatch(loadUser(user)),
        loadPlaces: (places) => dispatch(loadPlaces(places)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
