import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/auth'
import 'firebase/firestore';
import {loadPlace, loadUser} from './Actions/index';
import { Route } from "react-router-dom";

import './App.css';

import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

class App extends Component {
    constructor(){
        super();

        this.db = firebase.database().ref().child('users');
        this.auth = firebase.auth();
        this.authChange = this.authChange.bind(this);
        this.state={
            notes:[],
        }
        firebase.auth().onAuthStateChanged(this.authChange);
    }

    authChange(user){
        this.db = this.db.child(user.uid);
        this.props.loadUser(user);
        this.db.on('child_added', snap => {
            this.props.loadPlace(snap.val())
        })
    }

    componentDidMount(){
        let prevNotes = this.state.notes;
        this.db.on('child_added', snap => {
            prevNotes.push({
                id:snap.key,
                text: snap.val().text});

            this.setState({
                notes:prevNotes
            })
        })

        this.db.on('child_removed', snap => {
            for (var i = 0; i < prevNotes.length; i++) {
                if (prevNotes[i].id === snap.key) {
                    prevNotes.splice(i, 1);
                }
            }

            this.setState({
                notes:prevNotes
            })
        })
    }

  render() {
      console.log(this.props);
    return (
      <div className="App">
        {this.props.places.map((item, index)=>{
            return(
                <h1 key={index} className="note">{item.alias}</h1>
            )
        })}
        <form onSubmit={this.addNote}>
            <input type="text"/>
            <button text="Add" type="submit">Add</button>

        </form>
        <Route exact path="/signup" render={(props) => <SignUp {...props}/>}/>
        <Route exact path="/login" render={(props) => <Login {...props}/>}/>
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

const mapDispatchToProps = dispatch => {
    return{
        loadUser: (user) => dispatch(loadUser(user)),
        loadPlace: (place) => dispatch(loadPlace(place))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
