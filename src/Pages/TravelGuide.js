import React, {Component} from "react";
import { connect } from 'react-redux'


class TravelGuide extends Component {

    constructor(props){
        super(props);
    }

    render() {
        console.log("........");
        console.log(this.props.focusedTrip);
        return (
            <div className="travel-guide-page">
                Trip to {this.props.focusedTrip.to}
                {this.props.focusedTrip.trip.map((leg, key)=>{
                    return(
                        <div className="focused-trip-leg" key={key}>
                            <div className="focused-trip-leg-from">
                                 from {leg.origin.name} at {leg.travelMode.departure}
                            </div>
                            <div className="focused-trip-leg-conveyance">
                                {leg.travelMode.type === "WALK" ?
                                    "Walk"
                                :
                                    "Take " + leg.travelMode.name + " towards " + leg.travelMode.direction
                                }
                            </div>
                            <div className="focused-trip-leg-to">
                                arrive at {leg.destination.name} at {leg.travelMode.arrival}
                            </div>
                        </div>
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
