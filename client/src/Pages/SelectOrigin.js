import React, {Component} from "react";
import { connect } from 'react-redux'
import {changeLocation} from "../Actions/index"
// import { Container, Row, Col, Button } from 'react-bootstrap';
import { Button, Container, Row, Col } from 'reactstrap';

import {Link} from "react-router-dom";

class SelectOrigin extends Component {
    render(){
        return(
            <Container className="origin-selection-page">
                <Row className="origin-selection-header">
                    Where are you?
                </Row>
                
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
