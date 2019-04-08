import React, {Component} from "react";
import { connect } from 'react-redux'
import {changeLocation} from "../Actions/index"
// import { Container, Row, Col, Button } from 'react-bootstrap';
import { Button, Container, Row, Col } from 'reactstrap';

import {Link} from "react-router-dom";

class SelectOrigin extends Component {
    render(){
        return(
            <div className="origin-selection-page">
            <Button color="danger">
                Danger!
            </Button>
            <Container>
                <Row>
                    <Col md={4} className="testing1">
                     first
                    </Col>
                    <Col md={6} className="testing2">
                    scnd
                    </Col>
                </Row>
            </Container>

                <div className="origin-selection-header">
                    Where are you?
                </div>
                {this.props.places.map((place, index) => {
                    return(
                        <Link to="/select_destination" key={index}>
                            <div className="select-origin-box" onClick={()=>{
                                this.props.changeLocation(place);
                            }}>
                                {place.alias}
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        places: state.places,
        currentLocation: state.currentLocation,
    }
}


export default connect(
    mapStateToProps,
    {changeLocation},
)(SelectOrigin);
