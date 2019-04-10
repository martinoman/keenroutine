import React, {Component} from "react";
import PlacesSearchResult from "./PlacesSearchResult";
import { Row } from "reactstrap"
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import _ from "lodash"
import { connect } from 'react-redux'

class PlacesSearch extends Component {
    constructor(props){
        super(props);
        this.scrollRef = React.createRef()
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
                this.setState({
                    searchResult: data.ResponseData
                });
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

    render() {
        return (
            <Row className="places-search">
                <div ref={this.scrollRef} className="search-bar manage-places-search-bar keen-card">
                    <Element name="search" className="">
                        {"Search for new places to add"}
                    </Element>
                    <input type="text" className="search-places-field" placeholder="Search for stations" onChange={(event)=>{
                            let searchWord = event.target.value;
                            this.search(searchWord);
                        }}/>
                </div>
                <PlacesSearchResult results={this.state.searchResult}/>
            </Row>
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
