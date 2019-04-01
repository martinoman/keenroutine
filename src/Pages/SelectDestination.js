import React, {Component} from "react";
import { connect } from 'react-redux'
import {focusTrip} from '../Actions/index.js'
import {Link} from "react-router-dom";
import key from "../reseplanerareAPIKey.js"
import {print, formatData} from "../Helpers/Formatter.js"
class SelectDestination extends Component {
    constructor(props){
        super(props);
        this.state = {
            trips: []
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
            let params = this.getParameters(key,destinations[i],origin);
            tripPromises.push(this.apiCall(params, headers, destination.alias));
        }
        Promise.all(tripPromises).then(()=>{
            this.setState(this.state);
        }
        );
    }

    /**
    This shoudl probz return a list of parameter sets. One for each place
    */
    getParameters(key, dest, org){
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
        data = formatData(data);
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

    apiCall(params, headers, alias){
        return fetch("/selectDestinationTime?" + params, headers)
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
                {this.state.trips.map((trip, key)=>{
                    return (
                        <Link to="/travel_guide" key={key} >
                            <div className="trip-summary" onClick={() => {
                                    this.props.focusTrip(trip);
                                }}>
                                <div className="trip-summary-alias">
                                    To: {trip.to}
                                </div>
                                <div className="trip-summary-time-until-departure">
                                    {trip.timeUntilDeparture}min until departure
                                </div>
                                <div className="trip-summary-travel-time">
                                    {trip.travelTime}min total travel time
                                </div>
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
    {focusTrip},
)(SelectDestination);
