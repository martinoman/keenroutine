import React, {Component} from "react";
import { connect } from 'react-redux';
import { Container, Col, Row} from "reactstrap";

class TripLeg extends Component {
    constructor(props){
        super(props);
        this.state={
            leg: this.props.leg,
        }
    }

    render() {
        console.log(this.state.leg);
        return (
            <Container className="trip-leg">
                <Row>
                    <Col xs={2} className="trip-leg-line">
                    </Col>
                    <Col xs={10} className="trip-leg-info">
                        <Row className="trip-leg-from-info">
                            <Col xs={4} className="trip-leg-time">
                                {this.props.leg.travelMode.departure}
                            </Col>
                            <Col xs={8} className="trip-leg-place">
                                {this.props.leg.origin.name}
                            </Col>
                        </Row>
                        <Row className="-trip-leg-mode-info">
                            <Col xs={12}>
                                {this.props.leg.travelMode.name + " mot " + this.props.leg.travelMode.direction}
                            </Col>
                        </Row>
                        <Row className="trip-leg-to-info">
                            <Col xs={4} className="trip-leg-time">
                                {this.props.leg.travelMode.arrival}
                            </Col>
                            <Col xs={8} className="trip-leg-place">
                                {this.props.leg.destination.name}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return{
    }
}


const mapDispatchToProps = (dispath) => {
    return{
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TripLeg);
