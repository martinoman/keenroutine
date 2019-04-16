import React, {Component} from "react";
import { connect } from 'react-redux'
import {Link, withRouter} from "react-router-dom";
import { Row, Col } from 'reactstrap';
import {focusTrip} from '../Actions/index.js'
import _ from "lodash"
class TripSelectorTile extends Component {

    constructor(props){
        super(props);
        this.state = {
            pressed:false,
        }
    }

    touchEnd = _.debounce(() => {
        this.setState({
            pressed: false,
        });
    }, 400);

    touchStart = () => {
        this.setState({
            pressed: true,
        });
        this.props.focusTrip(this.props.trip);
    }

    render() {
        // console.log(this.props.trip.times);
        let depDate = this.props.trip.times.departureTime;
        let arrDate = this.props.trip.times.arrivalTime;
        let depString = depDate.getHours() + ":" + depDate.getMinutes();
        let arrString = arrDate.getHours() + ":" + arrDate.getMinutes();
        let addClass = this.state.pressed ? " active " : "";
        return(
            <Row className={"keen-card align-center pointer " + addClass} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
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
        )
    }
}

export default withRouter(connect(
    null,
    {focusTrip},
)(TripSelectorTile));
