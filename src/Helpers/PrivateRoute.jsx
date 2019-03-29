import React, {Component} from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";
import {Link} from "react-router-dom";
import { Redirect, Route } from 'react-router-dom'

class PrivateRoute extends Component {
    render(){
        return(
            <div className="private-route">
                {firebase.auth().currentUser ?
                    <Route path={this.props.path} render={this.props.render}/>
                    :
                    <Redirect to={{pathname: '/login'}} />
                }
            </div>
        );

    }

}

export default PrivateRoute;
