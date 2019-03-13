import React, {Component} from "react";
import { connect } from 'react-redux'

import {Link} from "react-router-dom";

class ManagePlaces extends Component {

    constructor(props){
        super(props);
    }

    addPlace(alias, adress){
        this.db.push().set({
            [alias]: adress,
        });
    }

    removePace(key){
        this.db.child(key).remove();
    }

    render() {
        return (
            <div className="manage_places_page">

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
