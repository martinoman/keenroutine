import React, {Component} from "react";
import { connect } from 'react-redux'
import {Link, withRouter} from "react-router-dom";
import { Row, Col } from 'reactstrap';
import {focusTrip} from '../Actions/index.js'

class TripSelectorTile extends Component {
    render() {
        // console.log(this.props.trip.times);
        let depDate = this.props.trip.times.departureTime;
        let arrDate = this.props.trip.times.arrivalTime;
        let depString = depDate.getHours() + ":" + depDate.getMinutes();
        let arrString = arrDate.getHours() + ":" + arrDate.getMinutes();
        return(
            <Link to="/travel_guide">
                <Row className="keen-card align-center" onClick={() => {
                        this.props.focusTrip(this.props.trip);
                    }}>
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
            </Link>
        )
    }
}

export default withRouter(connect(
    null,
    {focusTrip},
)(TripSelectorTile));
