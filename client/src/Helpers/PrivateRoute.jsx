import React, {Component} from "react";
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import FadingTrippleDots from "../Components/FadingTrippleDots/FadingTrippleDots.jsx"

class PrivateRoute extends Component {
    render(){
        return(
            <div className="private-route">
                {this.props.finishedLoading ?
                    this.props.user.userID ?
                        <Route path={this.props.path} render={this.props.render}/>
                    :
                        <Redirect to={{pathname: '/login'}} />
                :
                    <FadingTrippleDots center={true}/>
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
