import React, {Component} from "react";
import { connect } from 'react-redux'
import TripList from "../Components/TripList";
import RealtimeInfo from "../Components/RealtimeInfo";
import PlacesListWrapper from "../Components/PlacesListWrapper.jsx"

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class SelectDestination extends Component {

    render(){
        return(
            <div className="width-limiter">
                <div className="title">
                    Where are you going?
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Trips</Tab>
                        <Tab>Real time</Tab>
                    </TabList>

                    <TabPanel>
                        <TripList />
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
    }
}


export default connect(
    mapStateToProps,
    null,
)(SelectDestination);
