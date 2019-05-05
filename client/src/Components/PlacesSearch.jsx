import React, {Component} from "react";
import PlacesSearchResult from "./PlacesSearchResult";
import { Row } from "reactstrap"
import FadingTrippleDots from "../Components/FadingTrippleDots/FadingTrippleDots.jsx"
import _ from "lodash"
import { connect } from 'react-redux'

class PlacesSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchResult: [],
            loading: false,
        }
        this.searchField = React.createRef();
    }

    search = _.debounce((searchWord) => {
        fetch("/searchStation?searchWord=" + searchWord, {})
            .then(response => {
                if(response.ok)
                    return response.json()
                return null
            }).then(data => {
                this.setState({
                    searchResult: data.ResponseData
                });
                this.setState({loading: false});
                if(data.ResponseData.length > 0)
                    this.props.scrollTo(this.resultsRef);
            })
    }, 1000);

    addedPlace = () => {
        this.searchField.current.value = "";
        this.props.scrollToTop();
    }

    render() {
        return (
            <div  className="places-search">
                <h4 className="align-center-horizontal">Add more places</h4>
                <Row>
                    <div ref={(c) => { this.resultsRef = c; }} className="search-bar manage-places-search-bar keen-card">
                        <div name='search' id="scroll-element">
                            {"Search for new stations to add"}
                        </div>
                        <input ref={this.searchField} type="text" className="search-places-field" placeholder="Search for stations" onChange={(event)=>{
                                let searchWord = event.target.value;
                                this.setState({loading:true});
                                this.search(searchWord);
                            }}/>
                    </div>
                    {this.state.loading?
                        <FadingTrippleDots/>
                    :
                        <PlacesSearchResult results={this.state.searchResult} addedPlace={this.addedPlace}/>
                    }
                </Row>
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
