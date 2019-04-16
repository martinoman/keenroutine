import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";

import { IconContext } from "react-icons";
import { IoIosHome } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";
import { FaBus } from "react-icons/fa";

import _ from "lodash"

import "./NewTripButton.css"
class NewTripButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            pressed: false,
        }
    }

    reset = _.debounce(() => {
        this.setState({
            pressed: false,
        });
    }, 400);

    touchStart = () => {
        this.setState({
            pressed: true,
        });
    }

    touchEnd = () => {
        this.reset();
    }


    render() {
        let addClass = this.state.pressed ? " active" : ""
        return (
            <Link to="/select_origin" className="new-trip align-center">
                <div className={"new-trip-button align-center" + addClass} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
                    <FaBus className="new-trip-button-symbol"/>
                </div>
            </Link>
        );
    }
}

export default NewTripButton;
