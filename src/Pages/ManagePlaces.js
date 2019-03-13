import React, {Component} from "react";
import { connect } from 'react-redux'

import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import {Link} from "react-router-dom";

class ManagePlaces extends Component {

    constructor(props){
        super(props);
        console.log(this.props.user);
        this.db = firebase.database().ref().child('users');
    }

    addPlace(alias, adress){
        this.db.child(this.props.user.userID).push().set({
            [alias]: adress,
        });
    }

    removePace(key){
        this.db.child(this.props.user.userID).child(key).remove();
    }

    render() {
        return (
            <div className="manage_places_page">
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
