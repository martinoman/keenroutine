import React, {Component} from "react";
import "./FadingTrippleDots.css";
import {Container, Row, Col} from "reactstrap";

class FadingTrippleDots extends Component {

    constructor(props){
        super(props);
    }


    render() {
        return (
            <Container className={"fading-dots " + (this.props.center ? " center" : "")}>
                <Row className="align-center">
                    <Col xs={1}><div className="loading-dot dot1"></div></Col>
                    <Col xs={1}><div className="loading-dot dot2 align-center"></div></Col>
                    <Col xs={1}><div className="loading-dot dot3"></div></Col>
                </Row>
            </Container>
        );
    }
}
export default FadingTrippleDots;
