import React, {Component} from "react";
import { connect } from 'react-redux'
import {changeLocation} from "../Actions/index"

import {Link} from "react-router-dom";

class SelectPlace extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="place-selection-page">
                <div className="place-selection-header">
                    Where are you?
                </div>
                {this.props.places.map((place, index) => {
                    return(
                        <Link to="/select_destination" key={index}>
                            <div className="select-place-box" onClick={()=>{this.props.changeLocation(place.adress)}}>
                                {place.alias}
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        changeLocation: (adress) => dispatch(changeLocation(adress)),
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
)(SelectPlace);
