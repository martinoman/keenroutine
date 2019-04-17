import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom';

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";
import {loadUser, clearState, finishedLoading, loadAllPlaces} from "./Actions/index";
import './App.css';

import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import ManagePlaces from "./Pages/ManagePlaces";
import SelectOrigin from "./Pages/SelectOrigin";
import SelectDestination from "./Pages/SelectDestination";
import Navbar from "./Components/Navbar/Navbar.jsx";
import PrivateRoute from "./Helpers/PrivateRoute";
import NewTripButton from "./Components/NewTripButton/NewTripButton.jsx"

class App extends Component {
    constructor(){
        super();
        this.authChange = this.authChange.bind(this);
        firebase.auth().onAuthStateChanged(this.authChange);
    }

    authChange(user){
        if (user) {
            this.props.loadUser(user);
            this.props.loadAllPlaces(this.props.user.userID);
        }
        if (user === null) {
            this.props.clearState();
            localStorage.clear();
            this.props.finishedLoading();
        }
    }

    render() {
        return (
            <div className="App">
                <Navbar />
                    <div className="Content">
                        <Switch>
                            <Route exact path="/signup" render={(props) => <SignUp {...props}/>}/>
                            <Route exact path={"/login"} render={(props) => <Login {...props}/>}/>
                            <PrivateRoute showLoading={true} exact path="/manage_places" render={(props) => <ManagePlaces {...props}/>}/>
                            <PrivateRoute showLoading={true} exact path="/select_origin" render={(props) => <SelectOrigin {...props}/>}/>
                            <PrivateRoute showLoading={true} exact path="/select_destination" render={(props) => <SelectDestination {...props}/>}/>
                            <PrivateRoute showLoading={true} exact path="/" render={(props) => <Login {...props}/>}/>
                        </Switch>
                    </div>
                    <PrivateRoute wrap={true} showLoading={false} test="mcfly">
                        <NewTripButton/>
                    </PrivateRoute>
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

export default withRouter(connect(
    mapStateToProps,
    {loadUser, clearState, finishedLoading, loadAllPlaces},
)(App));
