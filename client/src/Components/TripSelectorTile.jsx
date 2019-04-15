import React, {Component} from "react";
import { connect } from 'react-redux'
import {Link, withRouter} from "react-router-dom";
import { logout } from "../Actions/index";
import { Row, Col } from 'reactstrap';
import {focusTrip} from '../Actions/index.js'

import { IconContext } from "react-icons";
import { FaBars } from "react-icons/fa";

class TripSelectorTile extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <Link to="/travel_guide">
                <Row className="keen-card" onClick={() => {
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

const mapStateToProps = (state) => {
    return{
    }
}

export default withRouter(connect(
    null,
    {focusTrip},
)(TripSelectorTile));
