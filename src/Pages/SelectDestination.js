import React, {Component} from "react";
import { connect } from 'react-redux'

import key from "../reseplanerareAPIKey.js"
class SelectDestination extends Component {
    constructor(props){
        super(props);
    }

    getTimes(){
        let url = "https://api.sl.se/api2/TravelplannerV3_1/trip.json?" + this.getParameters(key);
        let headers = {}
        this.apiCall(url, headers);
    }

    /**
    This shoudl probz return a list of parameter sets. One for each place
    */
    getParameters(key){
        let urlParams = "key=" + key;
        console.log(urlParams);
        let parameters = {
            lang: "se",
            destExtId: "TCE",
            maxChange: 3,
            originCoordLat: 59.353598,
            originCoordLong: 18.089658,
        }
        for (var key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                urlParams += "&" + key + "=" + parameters[key]
            }
        }
        return urlParams;
    }

    checkValid(response){
        console.log(response);
        if(response.ok)
            return response.json();
        return null;
    }

    apiCall(url, headers){
        fetch(url,headers)
            .then(response => this.checkValid(response))
            .then(data => {
                console.log("DATA:");
                console.log(data);
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
