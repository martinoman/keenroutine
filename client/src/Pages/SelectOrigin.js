import React, {Component} from "react";
import { connect } from 'react-redux'
import {changeLocation} from "../Actions/index";
import { Container, Row, Col } from 'reactstrap';

import {Link} from "react-router-dom";

class SelectOrigin extends Component {
    render(){
        return(
            <Container className="origin-selection-page">
                <Row className="origin-selection-header">
                    <Col xs={12} className="title">
                        Where are you?
                    </Col>
                </Row>
                {this.props.places.map((place, index) => {
                    return(
                        <Link to="/select_destination"  key={index}>
                            <Row>
                                <Col xs={10} className="list-selection-item"  onClick={()=>{
                                    this.props.changeLocation(place);
                                }}>
                                        <p className="vertical-center">{place.alias}</p>
                                </Col>
                            </Row>
                        </Link>
                    );
                })}
            </Container>
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
