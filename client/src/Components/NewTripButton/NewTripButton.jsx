import React, {Component} from "react";
import { Link } from "react-router-dom";

import { FaBus } from "react-icons/fa";


import "./NewTripButton.css"
class NewTripButton extends Component {

    render() {
        return (
            <Link to="/select_origin" className="new-trip align-center">
                    <FaBus className="new-trip-button-symbol"/>
            </Link>
        );
    }
}

export default NewTripButton;
