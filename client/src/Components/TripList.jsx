import React, {Component} from "react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {focusTrip} from '../Actions/index.js'
import { findAndParseTrip, tripTimes, filterWeirdWalks } from "../Helpers/ReseplanerareParser.js"
import { sortOnIndex } from "../Helpers/PlacesHelper.js"
import TripSelectorTile from './TripSelectorTile';
import { Container, Row, Col } from 'reactstrap';

class TripList extends Component {
    constructor(props){
        super(props);
        this.state = {
            trips: [],
            loading: true,
            loadedTrips: 0,
            isStateHealthy: this.isStateHealthy(),
        }
        this.tempState = {
            "trips":[],
            "loading": true};
    }

    isStateHealthy = () => {
        return !(this.props.currentLocation === undefined || this.props.currentLocation === "");
    }

    getTimes(){
        let destinations = sortOnIndex(this.props.places);
        let origin = this.props.currentLocation;
        let tripPromises = [];
        let headers = {}
        for (var i = 0; i < destinations.length; i++) {
            let destination = destinations[i];
            if(destination.location.id === origin.location.id)
                continue;
            let params = this.getParameters(destinations[i],origin);
            tripPromises.push(this.apiCall(params, headers, destination.alias));
        }
        Promise.all(tripPromises).then(()=>{
                this.tempState.loading = false;
                setTimeout(() => {
                    this.setState(this.tempState)
                }, 750);

            }
        );
    }

    /**
    This shoudl probz return a list of parameter sets. One for each place
    */
    getParameters(dest, org){
        dest = dest.location;
        org = org.location;
        let urlParams = "";
        let parameters = {
            lang: "se",
            maxChange: 5,
            destExtId: dest.id,
            destCoordLat: (dest.id === undefined) ? dest.y : undefined,
            destCoordLong: (dest.id === undefined) ? dest.x : undefined,
            originExtId: org.id,
            originCoordLat: (org.id === undefined) ? org.y : undefined,
            originCoordLong: (org.id === undefined) ? org.x : undefined,
        }
        for (let key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                if(parameters[key] !== undefined)
                    urlParams += "&" + key + "=" + parameters[key]
            }
        }
        return urlParams;
    }

    checkValid(response){
        if(response.ok)
            return response.json();
        return null;
    }

    addTripToState(data, alias){
        data = findAndParseTrip(data, 4); //Minimum of minutes until departure
        data = filterWeirdWalks(data);
        let times = tripTimes(data);
        let trip = {
            to: alias,
            from: this.props.currentLocation.alias,
            times: times,
            trip: data,
        }
        this.tempState.trips.push(trip);
    }

    apiCall(params, headers, alias){
        return fetch("/selectDestinationTime?" + params, headers)
            .then(response => this.checkValid(response))
            .then(data => {
                this.addTripToState(data, alias);
                let counter = this.state.loadedTrips + 1;
                this.setState({
                    loadedTrips: counter,
                })
            }).catch(error => {
                console.log("SOMETHING WENT WRONG:");
                console.log(error);
            });
    }

    componentDidMount(){
        if (this.state.isStateHealthy) {
            this.getTimes();
        }
    }

    tripList(){
        let triplist = this.state.trips.map((trip, index)=>{
            return (
                <TripSelectorTile trip={trip} key={index} />
            )})
        let dummyTripObject = {
            "from": "placeholder",
            "times":
                {"arrivalTime": "TEST1",
                "departureTime": "TEST2",
                "timeUntilDeparture": "123",
                "travelTime": "123"},
            "to": this.props.currentLocation.alias,
            "trip": [],
            "dummy" :true,
        }
        triplist.push(<TripSelectorTile trip={dummyTripObject} key={this.state.trips.length}/>)
        return triplist;
    }

    render(){
        let width = this.state.loadedTrips/(this.props.places.length-2) * 100;
        return(
            <Container className="destination-selection-trip-list">
                {this.state.isStateHealthy ?
                    <div className="">
                        {this.state.loading ?
                            <Row className="keen-card align-center loading-bar-wrapper">
                                <div className="loading-bar" style={{"width": width + "%"}}>
                                    <p className="loading-bar-text">
                                        Loading...
                                    </p>
                                </div>
                            </Row>
                                :
                            <div>
                                <Row className="keen-card greyed-out trip-list-header">
                                    <Col xs={4} className="trip-list-header-item">
                                        Destination
                                    </Col>
                                    <Col xs={4} className="trip-list-header-item">
                                        Departure
                                    </Col>
                                    <Col xs={4} className="trip-list-header-item">
                                        Arrival
                                    </Col>
                                </Row>
                                {this.tripList()}
                            </div>
                        }
                    </div>
            :
                <Redirect to={{pathname: '/select_origin'}} />}
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
    {focusTrip},
)(TripList);
