import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";

import { IconContext } from "react-icons";
import { TiPlus } from "react-icons/ti";

class NewTripButton extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Link to="/select_origin">
                <div className="new-trip-button">
                    <TiPlus/>
                </div>
            </Link>
        );
    }
}

export default NewTripButton;
