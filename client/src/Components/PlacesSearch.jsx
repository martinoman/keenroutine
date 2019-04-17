import React, {Component} from "react";
import PlacesSearchResult from "./PlacesSearchResult";
import { Row } from "reactstrap"
import {Element , scroller, animateScroll as scroll} from 'react-scroll'
import FadingTrippleDots from "../Components/FadingTrippleDots/FadingTrippleDots.jsx"

import _ from "lodash"
import { connect } from 'react-redux'

class PlacesSearch extends Component {
    constructor(props){
        super(props);
        this.scrollRef = React.createRef()
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
                    this.pageScroll();
            })
    }, 1000);

    pageScroll = () => {
        scroller.scrollTo('search', {
        duration: 800,
        delay: 0,
        offset: -50,
        smooth: 'easeInOutQuart'
      });
    }

    addedPlace = () => {
        this.searchField.current.value = "";
        scroll.scrollToTop({
            duration: 800,
            delay: 0,
            offset: -50,
            smooth: 'easeInOutQuart'
        });
    }

    render() {
        return (
            <div  className="places-search">
                <h4 className="align-center-horizontal">Add more places</h4>
                <Row>
                    <div ref={this.scrollRef} className="search-bar manage-places-search-bar keen-card">
                        <Element name="search" className="">
                            {"Search for new stations to add"}
                        </Element>
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
