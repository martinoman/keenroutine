import React, {Component} from "react";
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import {Link} from "react-router-dom";
import { removePlace } from "../Actions/index";

class Navbar extends Component {

    constructor(props){
        super(props);

        this.state = {
            expanded: false,
        }
    }

    render() {
        return (
            {this.state.extended ?
            <div className="">
                Not extended
            </div>
            :
            <div className="">
                Extended
            </div>}
        );
    }
}


const mapStateToProps = (state) => {
    return{
    }
}

const mapDispatchToProps = (dispath) => {
    return{
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navbar);
