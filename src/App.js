import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/database';
import { Route } from "react-router-dom";

import './App.css';

import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

class App extends Component {
    constructor(){
        super();

        this.db = firebase.database().ref().child('Notes');
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);

        this.state={
            notes:[]
        }
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

    addNote(e){
        e.preventDefault();
        if (e.target[0].value !== "") {
            this.db.push().set({
                'text': e.target[0].value
            })
        }
    }

    removeNote(id){
        this.db.child(id).remove();
    }

  render() {
    return (
      <div className="App">
        {this.state.notes.map((item)=>{
            return(
                <h1 key={item.id} className="note" onClick={()=>{this.removeNote(item.id)}}>{item.text}</h1>
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

export default App;
