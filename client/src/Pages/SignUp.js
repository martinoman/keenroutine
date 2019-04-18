import React, {Component} from "react";
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import {Link} from "react-router-dom";
import { Container, Row, Col} from "reactstrap"

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
            <Container className="Login-Signup">
                <Row>
                    <Col xs={{size:10, offset:1}}>
                        <div className="Login-Signup">
                            {this.state.signedUp ?
                                <div className="sign-up-success">
                                    <h3 className="sign-up-success-message">
                                        <span role="img" aria-label="Celebration">
                                            🎉
                                        </span>
                                        Account created, welcome to Keenroutine!
                                        <br/>
                                        <br/>
                                        Add some stations and find a trip by pressing the bottom or top bar!
                                        <span role="img" aria-label="Celebration">
                                            🙌
                                        </span>
                                    </h3>
                                    <Link to={"/manage_places"}>
                                        <button className="button sign-up-success-message-button">
                                            <h3>
                                                Get started!
                                            </h3>
                                        </button>
                                    </Link>
                                </div>
                                :
                                <div className="sign-up-content">
                                    <form onSubmit={this.handleSignUp}>
                                        <div className="input-field-wrapper">
                                            <h4>E-mail</h4>
                                            <input className="input-field" type="text"/>
                                        </div>
                                        <div className="input-field-wrapper">
                                            <h4>Password</h4>
                                            <input className="input-field" type="password"/>
                                        </div>
                                        <div className="input-field-wrapper">
                                            <h4>Confirm password</h4>
                                            <input className="input-field" type="password"/>
                                        </div>
                                        <br/>
                                        <button type="submit" className="button login-signup-button">Register</button>
                                    </form>
                                    <div className="sign-up-error-message">
                                        {this.state.message}
                                    </div>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default SignUp;
