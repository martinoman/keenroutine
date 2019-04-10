import React, {Component} from "react";
import { connect } from 'react-redux'
import TripList from "../Components/TripList"
import RealtimeInfo from "../Components/RealtimeInfo"
class SelectDestination extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTab: "trips",
        }
    }

    renderTabs = () => {
        switch(this.state.currentTab) {
            case "trips":
                console.log("i trips");
                return <TripList />;
            case "realtime":
                console.log("i realtime");
                return <RealtimeInfo />;
            default:
                console.log("i default");
                return <TripList />;
        }
    }

    changeTab = (newtab) => {
        this.setState({
            currentTab: newtab,
        })
    }

    render(){
        return(
            <div className="width-limiter">
                {this.renderTabs()}
                <button onClick={()=>this.changeTab("trips")}>
                    Change to trips
                </button>
                <button onClick={()=>this.changeTab("realtime")}>
                    Change to real time
                </button>
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
