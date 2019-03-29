import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";
import {loadUser, addPlace, clearState} from "./Actions/index";

import './App.css';

import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import ManagePlaces from "./Pages/ManagePlaces";
import SelectOrigin from "./Pages/SelectOrigin";
import SelectDestination from "./Pages/SelectDestination";
import TravelGuide from "./Pages/TravelGuide";
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Helpers/PrivateRoute";


class App extends Component {
    constructor(){
        super();
        this.authChange = this.authChange.bind(this);
        firebase.auth().onAuthStateChanged(this.authChange);
    }

    authChange(user){
        if (user) {
            this.props.loadUser(user);
            let db = firebase.database().ref().child('users').child(this.props.user.userID);
            db.on('child_added', snap => {
                this.props.addPlace(snap.val(), snap.key);
            })
        }
    }

  render() {
      return (
      <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/signup" render={(props) => <SignUp {...props}/>}/>
            <Route exact path={"/login"} render={(props) => <Login {...props}/>}/>
            <PrivateRoute exact path="/manage_places" render={(props) => <ManagePlaces {...props}/>}/>
            <PrivateRoute exact path="/select_origin" render={(props) => <SelectOrigin {...props}/>}/>
            <PrivateRoute exact path="/select_destination" render={(props) => <SelectDestination {...props}/>}/>
            <PrivateRoute exact path="/travel_guide" render={(props) => <TravelGuide {...props}/>}/>
            <PrivateRoute exact path="/" render={(props) => <Login {...props}/>}/>
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
        addPlace: (place, key) => dispatch(addPlace(place, key)),
        clearState: () => dispatch(clearState()),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(App));
