import React, {Component} from "react";
import { connect } from 'react-redux'
import TripList from "../Components/TripList";
import TravelGuide from "../Components/TravelGuide";
import RealtimeInfo from "../Components/RealtimeInfo";
import PlacesListWrapper from "../Components/PlacesListWrapper.jsx"

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class SelectDestination extends Component {

    render(){
        return(
            <div className="width-limiter">
                <div className="title">
                    Where to?
                </div>
                <Tabs>
                    <TabList>
                        <Tab className="react-tabs__tab text-tab"><span>Trips</span></Tab>
                        <Tab className="react-tabs__tab text-tab"><span className="tab-text">Real time</span></Tab>
                    </TabList>

                    <TabPanel>
                        {this.props.focusedTrip ? <TravelGuide/> : <TripList/> }
                    </TabPanel>
                    <TabPanel>
                        <RealtimeInfo />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        focusedTrip: state.focusedTrip,
        currentLocation: state.currentLocation,
    }
}


export default connect(
    mapStateToProps,
    null,
)(SelectDestination);
