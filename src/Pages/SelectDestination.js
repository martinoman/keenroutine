import React, {Component} from "react";
import { connect } from 'react-redux'

import key from "../reseplanerareAPIKey.js"
class SelectDestination extends Component {
    constructor(props){
        super(props);
        this.state = {
            trips: []
        }
    }

    /**
    I want to move this to a new class/file but exports are a mess.
    */
    slim(data){
        let legs = data.Trip[0].LegList.Leg;
        let trip = [];
        for (var i = 0; i < legs.length; i++) {
            let leg = this.slimLocationData(legs[i],i)
            leg.travelMode = this.slimTravelData(legs[i]);
            trip.push(leg);
        }
        return trip;
    }

    slimLocationData(leg, i){
        let origin = leg.Origin;
        let destination = leg.Destination;
        return{
            leg: i,
            origin: {
                name: origin.name,
                type: origin.type
            },
            destination: {
                name: destination.name,
                type: destination.type
            },
            conveyance: null
        }
    }

    slimTravelData(leg){
        return{
            type: leg.type,
            distance: leg.dist,
            departure: leg.Origin.time,
            arrival: leg.Destination.time,
            name: leg.name,
            direction: leg.direction
        }
    }

    getTimes(){
        let destinations = this.props.places;
        let origin = this.props.currentLocation;
        let tripPromises = [];
        let headers = {}
        for (var i = 0; i < destinations.length; i++) {
            let destination = destinations[i];
            if(destination === origin)
                continue;
            let url = "https://api.sl.se/api2/TravelplannerV3_1/trip.json?" + this.getParameters(key,destinations[i],origin);
            console.log("url");
            console.log(url);
            tripPromises.push(this.apiCall(url, headers, destination.alias));
        }
        Promise.all(tripPromises).then(console.log(this.state));
    }

    /**
    This shoudl probz return a list of parameter sets. One for each place
    */
    getParameters(key, dest, org){
        console.log(org);
        dest = dest.location;
        org = org.location;
        let urlParams = "key=" + key;
        let parameters = {
            lang: "se",
            maxChange: 3,
            limit: 2,
            destExtId: dest.id,
            destCoordLat: (dest.id === undefined) ? dest.y : undefined,
            destCoordLong: (dest.id === undefined) ? dest.x : undefined,
            originExtId: org.id,
            originCoordLat: (org.id === undefined) ? org.y : undefined,
            originCoordLong: (org.id === undefined) ? org.x : undefined,
        }
        for (var key in parameters) {
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
        data = this.slim(data);
        let departureTime = this.parseTimeString(data[0].travelMode.departure);
        let arrivalTime = this.parseTimeString(data[data.length-1].travelMode.arrival);
        let travelTime = (arrivalTime - departureTime)/60000; //Divided by millis in a minute
        let timeUntilDeparture = ((departureTime - (Date.now()))/60000);
        let trip = {
            to: alias,
            from: this.props.currentLocation.alias,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            travelTime: travelTime,
            timeUntilDeparture: timeUntilDeparture,
            trip: data,
        }
        this.state.trips.push(trip);
    }

    parseTimeString(string){
        let time = new Date(Date.now());
        let parts = string.split(":");
        time.setHours(parts[0]);
        time.setMinutes(parts[1]);
        time.setSeconds(parts[2]);
        return time;
    }

    apiCall(url, headers, alias){
        return fetch(url,headers)
            .then(response => this.checkValid(response))
            .then(data => {
                this.addTripToState(data, alias);
            }).catch(error => {
                console.log("SOMETHING WENT WRONG:");
                console.log(error);
            });
    }

    componentDidMount(){
        this.getTimes();
    }

    render(){
        return(
            <div className="destination-selection-page">
                {this.state.trips.length > 0 ? this.state.trips[0].to : ""}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{

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
    mapDispatchToProps,
)(SelectDestination);
