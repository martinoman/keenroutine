import React, {Component} from "react";
import { connect } from 'react-redux'
import TripList from "../Components/TripList"
import PlacesSearch from '../Components/PlacesSearch'
class SelectDestination extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TripList />
        );
    }
}

const mapStateToProps = (state) => {
    return{
    }
}


export default connect(
    mapStateToProps,
    null,
)(SelectDestination);
