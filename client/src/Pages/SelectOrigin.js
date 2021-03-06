import React, {Component} from "react";
import { connect } from 'react-redux'
import {changeLocation, focusTrip} from "../Actions/index";
import { Container, Row, Col } from 'reactstrap';
import PlacesListWrapper from "../Components/PlacesListWrapper.jsx"

import {Link} from "react-router-dom";

class SelectOrigin extends Component {
    render(){
        return(
        <div className="width-limiter">
            <Container className="origin-selection-page">
                <PlacesListWrapper link={true}>
                    <Row className="origin-selection-header">
                    <Col xs={12} className="title">
                        Where are you?
                    </Col>
                    </Row>
                    {this.props.places.map((place, index) => {
                        return(
                            <Link to="/select_destination"  key={index}>
                                <Row>
                                    <Col xs={12} className="keen-card align-center"  onClick={()=>{
                                        this.props.changeLocation(place);
                                        this.props.focusTrip(null);
                                    }}>
                                        {place.alias}
                                    </Col>
                                </Row>
                            </Link>
                        );
                    })}
                </PlacesListWrapper>
            </Container>

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
    {changeLocation, focusTrip},
)(SelectOrigin);
