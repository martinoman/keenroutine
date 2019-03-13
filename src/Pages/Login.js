import React, {Component} from "react";
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import {Link} from "react-router-dom";


class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            message: ""
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event){
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(
            event.target[0].value,
            event.target[1].value
        ).then(()=>{
            window.location.assign("/manage_places")
        }).catch((e)=>{
            console.log(e);
            this.setState({
                message: "Wrong password or email"
            });
            return;
        })
    }

    render() {
        return(
            <div className="login_page">
                <div className="login-title">Login</div>
                <form onSubmit={this.handleLogin}>
                    <input type="text" defaultValue="hyberg.martin@gmail.com"></input>
                    <input type="password" defaultValue="asdasd"></input>
                    <button type="submit">Login</button>
                </form>
                <div className="login_status_message">
                    {this.state.message}
                </div>
                <Link to="/manage_places">
                    Skip login
                </Link>
            </div>
        );
    }

}

export default Login;
