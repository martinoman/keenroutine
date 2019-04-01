import React, {Component} from "react";
import { connect } from 'react-redux'
import PlacesSearch from '../Components/PlacesSearch'
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import {Link} from "react-router-dom";
import { removePlace} from "../Actions/index";

class ManagePlaces extends Component {
    removePlace = (key) => {
        this.props.removePlace(key, this.props.user.userID);
    }

    renderPlacesList = () => {
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
                                <div onClick={()=>this.removePlace(place.key)}>
                                    x
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    render() {
        return (
            <div className="manage_places_page">
                {this.renderPlacesList()}
                <PlacesSearch />
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
    mapStateToProps,
    {removePlace},
)(ManagePlaces);
