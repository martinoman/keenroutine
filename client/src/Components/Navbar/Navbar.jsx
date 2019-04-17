import React, {Component} from "react";
import { connect } from 'react-redux'
import {Link, withRouter} from "react-router-dom";
import { logout } from "../../Actions/index";

import { IconContext } from "react-icons";
import { FaBars } from "react-icons/fa";

import "./Navbar.css"
class Navbar extends Component {

    constructor(props){
        super(props);
    }

    toggleNavbar = () => {
        this.props.setFocusContent(!this.props.focusContent);
    }

    render() {
        let expanded = !this.props.focusContent ? " expanded" : "";
        return (
            <div className="Navbar">
                <p className="navbar-title">
                    Keenroutine
                </p>
                <div className={"Navbar-bar " + expanded}>
                    <button onClick={this.toggleNavbar}>
                        <FaBars/>
                    </button>
                </div>
                <div className={"Navbar-list " + expanded} onClick={this.toggleNavbar}>
                    {this.props.user.userID ?
                        <>
                            <Link to="/manage_places" className="Navbar-list-item">Manage your places </Link>
                            <br/>
                            <Link to="/select_origin" className="Navbar-list-item">New trip </Link>
                            <br/>
                            <Link to="/login" className="Navbar-list-item" onClick={this.props.logout}>
                                Logout
                            </Link>
                        </>
                    :
                        <>
                            <Link to="/login" className="Navbar-list-item">Login </Link>
                            <br/>
                        </>
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        user: state.user,
    }
}

export default withRouter(connect(
    mapStateToProps,
    {logout},
)(Navbar));
