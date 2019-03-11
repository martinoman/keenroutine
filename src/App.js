import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/auth'
import 'firebase/firestore';

import {increment1, increment2} from './Actions/index';

import './App.css';

class App extends Component {
    constructor(){
        super();

        this.db = firebase.database().ref().child('Notes');
        this.auth = firebase.auth();
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
        <div>Counter1 = {this.props.counter1}</div>
        <div>Counter2 = {this.props.counter2}</div>
        <button onClick={this.props.increment1}>increment 1</button>
        <button onClick={this.props.increment2}>increment 2</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return{
        counter1: state.reducer.counter1,
        counter2: state.reducer.counter2
    }
}

const mapDispatchToProps = dispatch => {
    return{
        increment1: () => dispatch(increment1()),
        increment2: () => dispatch(increment2())
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
