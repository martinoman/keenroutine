import React, {Component} from "react";
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import {Link, withRouter} from "react-router-dom";
import { removePlace, clearState } from "../Actions/index";

class Navbar extends Component {

    constructor(props){
        super(props);

        this.state = {
            expanded: true,
        }
    }

    toggleNavbar = () => {
        const newStateOfNavbar = !this.state.expanded
        console.log(newStateOfNavbar);
        this.setState({
            expanded:newStateOfNavbar,
        })
    }

    logout = () => {
        firebase.auth().signOut()
        .then(() => {
            console.log("signout sucess");
            this.props.clearState();
            localStorage.clear();
            this.props.history.push('/login');
        })
        .catch((err) => {
            console.log(err);
            console.log("signOut falied");
        })
    }

    render() {
        return (
            <div className="">
            {this.state.expanded ?
                <div className="">
                    <button onClick={this.toggleNavbar}>
                        V
                    </button>
                </div>
                :
                <div className="" onClick={this.toggleNavbar}>
                    <Link to="/login">Login </Link>
                    <br/>
                    <Link to="/manage_places">Manage your places </Link>
                    <br/>
                    <Link to="/select_origin">New trip </Link>
                    <br/>
                    <div onClick={this.logout}>
                        logout
                    </div>
                    <button onClick={this.toggleNavbar}>
                        Λ
                    </button>
                </div>}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        clearState: () => dispatch(clearState()),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navbar));
