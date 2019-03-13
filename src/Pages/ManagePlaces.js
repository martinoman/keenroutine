import React, {Component} from "react";
import { connect } from 'react-redux'

import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import {Link} from "react-router-dom";

class ManagePlaces extends Component {

    constructor(props){
        super(props);
        this.db = firebase.database().ref().child('users');
    }

    addPlace = (event) => {
        event.preventDefault();
        let alias = event.target[0].value;
        let adress = event.target[1].value;
        this.db.child(this.props.user.userID).push().set({
            [alias]: adress,
        });
    }

    removePace(key){
        this.db.child(this.props.user.userID).child(key).remove();
    }


    renderPlacesList(){
        return(
            <div className="manage_places_list">
                {(this.props.user.userID == null)
                    ?
                    <div className="no-user-error">You must log in!</div>
                    :
                    this.props.places.map((place, index)=>{
                        return(
                            <div className="place-row" key={index}>
                                <div className="place-row-alias">
                                    {place.alias}
                                </div>
                                <div className="place-row-adress">
                                    {place.adress}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    renderAddPlaceForm(){
        return(
            <div className="add_place">
                <div className="add_place_header">Add a location!</div>
                <form onSubmit={this.addPlace} className="add_place_form">
                    <div className="add_place_alias_header">What is the location called?</div>
                    <input type="text" id="add_place_alias" placeholder="Home/Work/School etc"></input>
                    <div className="add_place_adress_header">What is the adress?</div>
                    <input type="text" id="add_place_adress" placeholder="Dinglestreet 420"></input>
                    <button type="submit" id="add_place_submit">Add</button>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div className="manage_places_page">
                {this.renderPlacesList()}
                {this.renderAddPlaceForm()}
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


export default connect(
    mapStateToProps
)(ManagePlaces);
