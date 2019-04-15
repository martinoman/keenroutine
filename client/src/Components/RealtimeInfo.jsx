import React, {Component} from "react";
import { connect } from 'react-redux'
import { getTimes } from "../Helpers/RealtidsInfoParser.js"
import RealtimeModeList from "./RealtimeModeList";
// const key = require("../realtidsinfoAPIKey.js");
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
class RealtimeInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading: true,
        }
    }

    componentDidMount(){
        let params = "&siteid=" + this.props.currentLocation.location.id + "&timewindow=" + 45
        fetch("/getRealTimeInfo?" + params, {})
            .then(response => this.checkValid(response))
            .then(data => {
                data = getTimes(data.ResponseData);
                let show = new Array(data.length);
                show.fill(false);
                this.setState({
                    data: data,
                    show: show,
                    loading: false,
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
                this.state.loading ?
                <div>
                    Loading
                </div>
                :
                <Tabs>
                    <TabList>
                        <Tab>Metro</Tab>
                        <Tab>Bus</Tab>
                        <Tab>Train</Tab>
                        <Tab>Tram</Tab>
                        <Tab>Ships</Tab>
                    </TabList>
                    {
                        Object.keys(this.state.data).map((key, index)=>{
                            let data = this.state.data[key];
                            if (data.length === 0) {
                                return(
                                    <TabPanel key={index}>
                                        Sorry, no departures available for the selected transportation mode
                                    </TabPanel>
                                );
                            }
                            return(
                                <TabPanel key={index}>
                                {
                                    data.map((arrival, index) => {
                                        let mode = arrival.transportMode.toLowerCase();
                                        mode = mode.charAt(0).toUpperCase() + mode.slice(1);
                                        let lineNumber = arrival.lineNumber;
                                        let dest = arrival.destination;
                                        let time = arrival.displayTime;
                                        let displayString = mode + " " + lineNumber + " to: " + dest + "\t" + time
                                        return(
                                            <div className="real-time-mode-list-item" key={index}>
                                                {displayString}
                                            </div>
                                        );
                                    })
                                }
                                </TabPanel>
                            );
                        })
                    }
                </Tabs>
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
