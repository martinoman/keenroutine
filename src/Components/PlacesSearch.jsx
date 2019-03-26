import React, {Component} from "react";
import PlacesSearchResult from "./PlacesSearchResult";

import _ from "lodash"
import { connect } from 'react-redux'
import {Link} from "react-router-dom";
import { removePlace } from "../Actions/index";


class PlacesSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchResult: [],
        }
    }

    render() {
        return (
            <div className="places-search">
                <div className="search-bar">
                    <input type="text" placeholder="Search for stations" onChange={(event)=>{
                            let searchWord = event.target.value;
                            _.debounce(() => { //Doesn't work at all. Piece of shit.
                                let requestURL = "https://api.sl.se/api2/typeahead.json?key=8376d23038b74e9a98544c1795a6613c&searchstring=" + searchWord
                                fetch(requestURL, {})
                                .then(response => {
                                    if(response.ok)
                                        return response.json()
                                    return null
                                }).then(data => {
                                    console.log(data);
                                    this.setState({
                                        searchResult: data.ResponseData
                                    });
                                })
                            }, 300)();
                        }}/>
                </div>
                <PlacesSearchResult results={this.state.searchResult}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        places: state.places,
    }
}


const mapDispatchToProps = (dispath) => {
    return{
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlacesSearch);
