import React, {Component} from "react";
import { connect } from 'react-redux'
import TripLeg from "../Components/TripLeg.jsx"

class TravelGuide extends Component {
    render() {
        return (
            <div className="Travel-guide">
                Trip to {this.props.focusedTrip.to}
                {this.props.focusedTrip.trip.map((leg, key)=>{
                    return(
                        <TripLeg leg={leg}/>
                    );
                })}
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
        focusedTrip: state.focusedTrip,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TravelGuide);
