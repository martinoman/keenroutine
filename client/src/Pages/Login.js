import React, {Component} from "react";
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import { Redirect } from 'react-router-dom';
import {Link} from "react-router-dom";
import { Container, Row, Col } from 'reactstrap'
import { setFinishedLoading } from '../Actions/index.js'

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            message: "",
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.setMessage = this.setMessage.bind(this);
    }

    setMessage(msg){
        this.setState({
            message: "Wrong password or email"
        });
    }

    handleLogin(event){
        event.preventDefault();
        let email = event.target[0].value;
        let pw = event.target[1].value;
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(() => {
              return firebase.auth().signInWithEmailAndPassword(
                  email,
                  pw
              )
          })
          .catch(function(e) {
              console.log(e);
              // this.setMessage("Wrong email or password");
              return;
          });
          this.props.setFinishedLoading(false);
    }

    render() {
        return(
            <Container className="Login-Signup">
                <Row>
                    <Col xs={{size:10, offset:1}}>
                        <form onSubmit={this.handleLogin} className="login-credentials">
                            <div className="input-field-wrapper">
                                <h3>Email</h3>
                                <input type="text" className="input-field" ></input> <br/>
                            </div>
                            <div className="input-field-wrapper">
                                <h3>Password</h3>
                                <input type="password" className="input-field"></input><br/>{/*Hardcoded password please fix me TODO*/}
                                </div>
                                <Row>
                                    <Col xs={{size:6, offset:0}}>
                                        <button type="submit" className="button login-signup-button">Login</button>
                                    </Col>
                                    <Col xs={{size:6, offset:0}}>
                                        <Link to={"/signup"}>
                                            <button className="button login-signup-button">
                                                    Sign up!
                                            </button>
                                        </Link>
                                    </Col>
                                </Row>
                            </form>
                            <div className="login_status_message">
                                {this.state.message}
                            </div>
                            {firebase.auth().currentUser ? <Redirect to={{pathname: '/select_origin'}} /> : ""}
                    </Col>
                </Row>
            </Container>
        );
    }

}


const mapStateToProps = (state) => {
    return{
        finishedLoading: state.finishedLoading,
    }
}


export default connect(
    mapStateToProps,
    {setFinishedLoading},
)(Login);
