import React, {Component} from "react";
import { connect } from 'react-redux'
import {Link, withRouter} from "react-router-dom";
import { Row, Col } from 'reactstrap';
import {focusTrip} from '../Actions/index.js'

class TripSelectorTile extends Component {
    render() {
        return(
            <Link to="/travel_guide">
                <Row className="keen-card align-center" onClick={() => {
                        this.props.focusTrip(this.props.trip);
                    }}>
                    <Col xs={4}>
                        {this.props.trip.to}
                    </Col>
                    <Col xs={4}>
                        Dep: {Math.ceil(this.props.trip.times.timeUntilDeparture)}
                    </Col>
                    <Col xs={4}>
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
