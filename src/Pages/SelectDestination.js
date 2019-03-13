import React, {Component} from "react";
import { connect } from 'react-redux'
import {changeLocation} from "../Actions/index"

import {Link} from "react-router-dom";

class SelectDestination extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="destination-selection-page">
                A map to {this.props.currentLocation}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{

    }
}

const mapStateToProps = (state) => {
    return{
        places: state.places,
        currentLocation: state.currentLocation,
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectDestination);
