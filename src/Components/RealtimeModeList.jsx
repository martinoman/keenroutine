import React, {Component} from "react";
import { connect } from 'react-redux'

class RealtimeModeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
    }

    onClick = () => {
        this.setState({
            show: !this.state.show,
        });
    }

    render() {
        return (
            <div className="real-time-mode-wrapper">
                <div className="button" onClick={this.onClick.bind(this)}>
                    {this.props.mode}
                </div>
                {this.state.show ?
                    <div className="real-time-mode-list">
                        {
                            this.props.data.map((arrival, index) => {
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
                    </div>
                    :
                    ""
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
    }
}


const mapDispatchToProps = (dispath) => {
    return{
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RealtimeModeList);
