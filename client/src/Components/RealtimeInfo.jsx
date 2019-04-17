import React, {Component} from "react";
import { connect } from 'react-redux'
import { getTimes } from "../Helpers/RealtidsInfoParser.js"
import RealtimeModeList from "./RealtimeModeList";
import {Container, Row, Col} from "reactstrap"

//icons
import { MdDirectionsBus as Bus, MdDirectionsSubway as Metro, MdDirectionsBoat as Ships, MdTram as Tram, MdTrain as Train} from "react-icons/md"
import 'react-tabs/style/react-tabs.css';

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
                <Tabs className="fade-in">
                    <TabList>
                        <Tab><Metro className="tab-icon"/></Tab>
                        <Tab><Bus className="tab-icon"/></Tab>
                        <Tab><Train className="tab-icon"/></Tab>
                        <Tab><Tram className="tab-icon"/></Tab>
                        <Tab><Ships className="tab-icon"/></Tab>
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
                                    <Container>
                                        {
                                            data.map((arrival, index) => {
                                                let lineNumber = arrival.lineNumber;
                                                let dest = arrival.destination;
                                                let time = arrival.displayTime;
                                                return(
                                                    <Row className="real-time-mode-list-item keen-card align-center" key={index}>
                                                        <Col xs={2} className="realtime-mode-info">
                                                            {lineNumber}
                                                        </Col>
                                                        <Col xs={6} className="realtime-destination-info align-center">
                                                            {dest}
                                                        </Col>
                                                        <Col xs={4} className="realtime-time-info">
                                                            {time}
                                                        </Col>
                                                    </Row>
                                                );
                                            })
                                        }
                                    </Container>
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
