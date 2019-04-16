import React, {Component} from "react";
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import FadingTrippleDots from "../Components/FadingTrippleDots/FadingTrippleDots.jsx"

class PrivateRoute extends Component {
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.test);
        console.log(this.props.showLoading);
        let loaded = this.props.finishedLoading;
        let loggedIn = this.props.user.userID;
        let shouldWrap = this.props.wrap;
        let showLoading = this.props.showLoading;
        return (
            <div className="private-route">
                {
                    loaded ?
                        loggedIn ?
                            shouldWrap ?
                                this.props.children
                            :
                                <Route path={this.props.path} render={this.props.render}/>
                        : //Not logged in
                            <Redirect to={{pathname: '/login'}} />
                    : //Not completely loaded
                        showLoading ?
                            <FadingTrippleDots center={true}/>
                        :
                            ""
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        finishedLoading: state.finishedLoading
    }
}

export default connect(
    mapStateToProps,
    {},
)(PrivateRoute);
