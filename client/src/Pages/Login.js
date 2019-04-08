import React, {Component} from "react";
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import { Redirect } from 'react-router-dom'


class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            message: "",
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event){
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(
            event.target[0].value,
            event.target[1].value
        ).catch((e)=>{
            console.log(e);
            this.setState({
                message: "Wrong password or email"
            });
            return;
        })
    }

    render() {
        return(
            <div className="Login">
                <div className="login-title">Login</div>
                <form onSubmit={this.handleLogin}>
                    <div className="input-field-wrapper">
                        <h3>Email</h3>
                        <input type="text" className="input-field" defaultValue="a@a.com"></input> <br/>
                    </div>
                    <div className="input-field-wrapper">
                        <h3>Password</h3>
                        <input type="password" className="input-field" defaultValue="asdasd"></input><br/>{/*Hardcoded password please fix me TODO*/}
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="login_status_message">
                    {this.state.message}
                </div>
                {firebase.auth().currentUser ? <Redirect to={{pathname: '/select_origin'}} /> : ""}
            </div>
        );
    }

}

export default Login ;
