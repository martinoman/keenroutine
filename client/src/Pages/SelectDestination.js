import React, {Component} from "react";
import { connect } from 'react-redux'
import TripList from "../Components/TripList"
import RealtimeInfo from "../Components/RealtimeInfo"
class SelectDestination extends Component {
    render(){
        return(
            <div className="Select-destination">
                <TripList />
                <RealtimeInfo />
            </div>
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
