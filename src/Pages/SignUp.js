import React, {Component} from "react";
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import {Link} from "react-router-dom";


class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            message: "",
            signedUp: false
        }
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp(event){
        event.preventDefault();
        let failed = false;
        if(event.target[1].value !== event.target[2].value){
            this.setState({
                message: "Passwords do not match!"
            });
            failed = true;
        }else{
            firebase.auth().createUserWithEmailAndPassword(
                event.target[0].value,
                event.target[1].value
            ).catch((e)=>{
                this.setState({
                    message: e.message
                });
                failed = true;
            }).then(()=>{
                if(!failed){
                    this.setState({
                        signedUp: true
                    });
                }
            });
        }
    }
    render() {
        return (
            <div className="sign_up_page">
                {this.state.signedUp ?
                    <div className="sign_up_success">
                        <div className="sign_up_success_message">
                            Account successfully created!
                        </div>
                        <Link to={"/login"}>
                            <button>Go to login</button>
                        </Link>
                    </div>
                    :
                    <div className="sign_up_content">

                        <form onSubmit={this.handleSignUp}>
                            <p>E-mail</p>
                            <input type="text" defaultValue="Hyberg.martin@gmail.com"/>
                            <p>Password</p>
                            <input type="password" defaultValue="AfraidOfBees"/>
                            <p>Confirm password</p>
                            <input type="password" defaultValue="AfraidOfBees"/>
                            <br/>
                            <button type="submit">Sign the f*** up</button>
                        </form>
                        <div className="sign_up_error_message">
                            {this.state.message}
                        </div>
                    </div>
                }
            </div>
        );
    }

}

export default SignUp;
