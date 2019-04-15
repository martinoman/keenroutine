import React, {Component} from "react";
import { connect } from 'react-redux'
import PlacesSearchResultItem from "./PlacesSearchResultItem"

class PlacesSearchResult extends Component {

    constructor(props){
        super(props);
        this.state = {
            inputAlias: false,
        }
    }
    renderList(){
        return(
            <div className="places-search-result-list">
                {this.props.results.map((place, key)=>{
                    return(
                        <PlacesSearchResultItem place={place} key={key} scrollToTop={this.props.scrollToTop}/>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <div className="places-search-results">
                {this.renderList()}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlacesSearchResult);
