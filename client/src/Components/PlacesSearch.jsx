import React, {Component} from "react";
import PlacesSearchResult from "./PlacesSearchResult";

import _ from "lodash"
import { connect } from 'react-redux'

class PlacesSearch extends Component {
    constructor(props){
        super(props);


        this.state = {
            searchResult: [],
        }
    }

    search = _.debounce((searchWord) => {
        fetch("/searchStation?searchWord=" + searchWord, {})
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
    }, 1000);

    render() {
        return (
            <div className="places-search">
                <div className="search-bar manage-places-search-bar">
                    <div className="">
                        {"Search for new places to add"}
                    </div>
                    <input type="text" className="search-places-field" placeholder="Search for stations" onChange={(event)=>{
                            let searchWord = event.target.value;
                            this.search(searchWord);
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
