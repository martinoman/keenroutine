import React, {Component} from "react";
import { connect } from 'react-redux'
import {changeLocation} from "../Actions/index"

import {Link} from "react-router-dom";

class SelectOrigin extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="origin-selection-page">
                <div className="origin-selection-header">
                    Where are you?
                </div>
                {this.props.places.map((place, index) => {
                    return(
                        <Link to="/select_destination" key={index}>
                            <div className="select-origin-box" onClick={()=>{
                                this.props.changeLocation(place);
                            }}>
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
        changeLocation: (location) => dispatch(changeLocation(location)),
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
)(SelectOrigin);
