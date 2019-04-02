import React, {Component} from "react";
import { connect } from 'react-redux'
import { getTimes } from "../Helpers/RealtidsInfoParser.js"
import RealtimeModeList from "./RealtimeModeList";
const key = require("../realtidsinfoAPIKey.js");
class RealtimeInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount(){
        let params = "key=" + key.key + "&siteid=" + this.props.currentLocation.location.id + "&timewindow=" + 45
        fetch("/getRealTimeInfo?" + params, {})
            .then(response => this.checkValid(response))
            .then(data => {
                data = getTimes(data.ResponseData);
                console.log(data);
                let show = new Array(data.length);
                show.fill(false);
                this.setState({
                    data: data,
                    show: show,
                });
            }).catch(error => {
                console.log("SOMETHING WENT WRONG:");
                console.log(error);
            });
    }

    checkValid(response){
        if(response.ok)
            return response.json();
        return null;
    }

    render() {
        return (
            <div className="real-time-information">
                {
                    Object.keys(this.state.data).map((key, index)=>{
                        let mode = this.state.data[key];
                        let shouldShow = mode.length > 0;
                        return(
                            shouldShow ? <RealtimeModeList mode={key} data={mode} key = {key}/> : ""
                        );
                    })
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        currentLocation: state.currentLocation,
    }
}


const mapDispatchToProps = (dispath) => {
    return{
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RealtimeInfo);
