import React, {Component} from "react";
import { connect } from 'react-redux'
import {Link, withRouter} from "react-router-dom";
import { logout } from "../Actions/index";

class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            expanded: true,
        }
    }

    toggleNavbar = () => {
        const newStateOfNavbar = !this.state.expanded
        this.setState({
            expanded:newStateOfNavbar,
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
                    <div onClick={this.props.logout}>
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

export default withRouter(connect(
    mapStateToProps,
    {logout},
)(Navbar));
