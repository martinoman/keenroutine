import React, {Component} from "react";
import { connect } from 'react-redux'
import {focusTrip} from '../Actions/index.js'
import {Link} from "react-router-dom";
import { findAndParseTrip, tripTimes, filterWeirdWalks } from "../Helpers/ReseplanerareParser.js"
import { sortOnIndex } from "../Helpers/PlacesHelper.js"
import TripSelectorTile from './TripSelectorTile';
import { Container, Row } from 'reactstrap';
import _ from 'lodash'

class TripList extends Component {
    constructor(props){
        super(props);
        this.state = {
            trips: [],
            loading: true,
            loadedTrips: 0,
        }
    }

    getTimes(){
        let destinations = sortOnIndex(this.props.places);
        let origin = this.props.currentLocation;
        let tripPromises = [];
        let headers = {}
        for (var i = 0; i < destinations.length; i++) {
            let destination = destinations[i];
            if(destination === origin)
                continue;
            let params = this.getParameters(destinations[i],origin);
            tripPromises.push(this.apiCall(params, headers, destination.alias));
        }
        Promise.all(tripPromises).then(()=>{
                this.state.loading = false;
                setTimeout(() => {
                    this.setState(this.state)
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
        this.state.trips.push(trip);
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
        this.getTimes();
    }

    tripList(){
        return this.state.trips.map((trip, index)=>{
            return (
                <TripSelectorTile trip={trip} key={index} />
            )})
    }

    render(){
        let width = this.state.loadedTrips/(this.props.places.length-2) * 100;
        return(
            <Container className="destination-selection-trip-list">
                {this.state.loading ?
                    <div className="loading-bar-wrapper">
                        <div style={{"width": width + "%"}} className="loading-bar">
                        </div>
                        <p>
                            Loading...
                        </p>
                    </div>
                    :
                    <div>
                        {this.tripList()}
                    </div>
            }
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
