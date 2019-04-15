import React, {Component} from "react";
import { connect } from 'react-redux'
import {Link, withRouter} from "react-router-dom";
import { Row, Col } from 'reactstrap';
import {focusTrip} from '../Actions/index.js'

class TripSelectorTile extends Component {
    render() {
        return(
            <Link to="/travel_guide">
                <Row className="list-selection-item" onClick={() => {
                        this.props.focusTrip(this.props.trip);
                    }}>
                    <Col xs={4} className="vertical-center">
                        {this.props.trip.to}
                    </Col>
                    <Col xs={4} className="vertical-center">
                        Dep: {Math.ceil(this.props.trip.times.timeUntilDeparture)}
                    </Col>
                    <Col xs={4} className="vertical-center">
                        Time {Math.ceil(this.props.trip.times.travelTime)}
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
