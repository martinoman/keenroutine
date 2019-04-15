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

    getTrimmedTime(string){
        return string.substring(0,string.length-3);
    }

    render() {
        let order = "middle";
        if(this.props.first)
            order = "first";
        else if(this.props.last)
            order = "last";
        return (
            <div>
                <Row className={"trip-leg " + order}>
                    <Col xs={12} className="trip-leg-info">
                        <Row className="trip-leg-from-info">
                            <Col xs={2} className="trip-leg-time">
                                {this.getTrimmedTime(this.props.leg.travelMode.departure)}
                            </Col>
                            <Col xs={10} className="trip-leg-place">
                                {this.props.leg.origin.name}
                            </Col>
                        </Row>
                            <Row className="trip-leg-mode-info">
                                <Col xs={{size:10, offset:2}}>
                                    {this.props.leg.travelMode.type === "WALK" ?
                                        "Gå " + this.props.leg.travelMode.distance + " meter"
                                        :
                                        this.props.leg.travelMode.name + " mot " + this.props.leg.travelMode.direction
                                    }
                                </Col>
                            </Row>
                        <Row className="trip-leg-to-info">
                            <Col xs={2} className="trip-leg-time">
                                {this.getTrimmedTime(this.props.leg.travelMode.arrival)}
                            </Col>
                            <Col xs={10} className="trip-leg-place">
                                {this.props.leg.destination.name}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {order === "first" || order === "middle" ?
                    <Row className="leg-border-wrapper">
                        <div className="leg-border"/>
                    </Row>
                    :""}
            </div>
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
