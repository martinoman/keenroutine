import React, {Component} from "react";
import { connect } from 'react-redux'
import TripLeg from "../Components/TripLeg.jsx"
import {Container, Col} from "reactstrap"
import TripList from "../Components/TripList";
import {focusTrip} from '../Actions/index.js'

class TravelGuide extends Component {
    render() {
        let trip = this.props.focusedTrip.trip;
        return (
            <Container className="travel-guide fade-in">
                <Col xs={{ size: 12, offset: 0}}>
                    <div className="trip-chart">
                        <div className="title">
                            Trip to {this.props.focusedTrip.to}
                        </div>
                        {trip.map((leg, index)=>{
                            return(
                                <TripLeg
                                    leg={leg}
                                    key={index}
                                    first={index === 0}
                                    middle={index !== 0 && index < trip.length - 1}
                                    last={index === trip.length - 1}
                                    includeBorder={index < trip.length - 1}/>
                            );
                        })}
                    </div>
                    <button className="button" onClick={
                        ()=>{
                            this.props.focusTrip(null)
                        }
                    }> Back </button>
                </Col>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        focusedTrip: state.focusedTrip,
    }
}

export default connect(
    mapStateToProps,
    {focusTrip},
)(TravelGuide);
