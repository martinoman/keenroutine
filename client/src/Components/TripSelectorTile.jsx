import React, {Component} from "react";
import { connect } from 'react-redux'
import {Link, withRouter} from "react-router-dom";
import { Row, Col } from 'reactstrap';
import {focusTrip} from '../Actions/index.js'
import _ from "lodash"
class TripSelectorTile extends Component {

    constructor(props){
        super(props);
    }

    touchStart = () => {
        this.props.focusTrip(this.props.trip);
    }

    formatTime(date){
        let hours =  "0" + date.getHours(); //Pad time so it's either 0xx or 0x
        let minutes = "0" + date.getMinutes();
        let time = hours.slice(-2) + ":" + minutes.slice(-2); //Take only last two letters
        return time;
    }

    render() {
        let depString, arrString;
        let noTripFound = this.props.trip.trip === null;
        let specialCardText = "You're here!";
        if(noTripFound){
            specialCardText = "No suitable trip"
        }else if (!this.props.trip.dummy) {
            let depDate = this.props.trip.times.departureTime;
            let arrDate = this.props.trip.times.arrivalTime;
            depString = this.formatTime(depDate);
            arrString = this.formatTime(arrDate);
        }
        return(
            <div>
                {noTripFound || this.props.trip.to === this.props.currentLocation.alias ?
                    <Row className={"keen-card-greyed-out align-center"}>
                        <Col xs={4}>
                            {this.props.trip.to}
                        </Col>
                        <Col className="departure-info" xs={8}>
                            <div className="trip-info-text">
                                {specialCardText}
                            </div>
                        </Col>
                    </Row>
                    :
                    <Row className={"keen-card align-center pointer"} onTouchStart={this.touchStart}>
                        <Col xs={4}>
                            {this.props.trip.to}
                        </Col>
                        <Col className="departure-info" xs={4}>
                            <div className="trip-info-text">
                                Departure
                            </div>
                            <div className="trip-info-time">
                                {depString}
                            </div>
                        </Col>
                        <Col className="arrival-info" xs={4}>
                            <div className="trip-info-text">
                                Arrival
                            </div>
                            <div className="trip-info-time">
                                {arrString}
                            </div>
                        </Col>
                    </Row>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        currentLocation: state.currentLocation,
    }
}

export default withRouter(connect(
    mapStateToProps,
    {focusTrip},
)(TripSelectorTile));
