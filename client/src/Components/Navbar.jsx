import React, {Component} from "react";
import { connect } from 'react-redux'
import {Link, withRouter} from "react-router-dom";
import { logout } from "../Actions/index";

class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            expanded: false,
        }
    }

    toggleNavbar = () => {
        const newStateOfNavbar = !this.state.expanded
        this.setState({
            expanded:newStateOfNavbar,
        })
    }

    render() {
        let expanded =this.state.expanded ? " expanded" : ""
        return (
            <div className="Navbar">
                <div className="Navbar-bar">
                    <button onClick={this.toggleNavbar}>
                        {this.state.expanded ? "Λ" : "V"}
                    </button>
                </div>
                <div className={"Navbar-list " + expanded} onClick={this.toggleNavbar}>
                    <Link to="/login" className="Navbar-list-item">Login </Link>
                    <br/>
                    <Link to="/manage_places" className="Navbar-list-item">Manage your places </Link>
                    <br/>
                    <Link to="/select_origin" className="Navbar-list-item">New trip </Link>
                    <br/>
                    <Link to="/login" className="Navbar-list-item" onClick={this.props.logout}>
                        Logout
                    </Link>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
    }
}

export default withRouter(connect(
    mapStateToProps,
    {logout},
)(Navbar));
