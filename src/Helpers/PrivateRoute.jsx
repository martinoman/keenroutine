import React, {Component} from "react";
import firebase from "firebase/app";
import { connect } from 'react-redux'
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";
import {Link} from "react-router-dom";
import { Redirect, Route } from 'react-router-dom'

class PrivateRoute extends Component {
    render(){
        console.log(this.props.loggedIn);
        return(
            <div className="private-route">
                <Route path={this.props.path} render={this.props.render}/>
            </div>
        );

        // {this.props.loggedIn ?
        //     <Route path={this.props.path} render={this.props.render}/>
        //     :
        //     <Redirect to={{pathname: '/login'}} />
        // }
    }

}

const mapStateToProps = (state) => {
    return{
        loggedIn: state.loggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PrivateRoute);
