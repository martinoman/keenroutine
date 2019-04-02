import React, {Component} from "react";
import { connect } from 'react-redux'
import { addPlace } from '../Actions/index.js'
import _ from "lodash"

class PlacesSearchResultItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            messageCode: 0, //0: nominal, 1: enter alais, 2: place already exists
        }
    }

    resetErrorMessage = _.debounce(() => {
        this.setState({
            messageCode:0,
        });
    }, 3000);

    addPlace = event => {
        this.setState({
            messageCode: 0,
        });
        event.preventDefault();
        this.setState({inputAlias:false});
        let alias = event.target[0].value;
        let placeDBFormat = {
            location:{
                Alias: alias,
                ID: this.props.place.SiteId,
                X: this.props.place.X,
                Y: this.props.place.Y,
                Index: this.props.places.length,
            }
        }
        this.props.addPlace(placeDBFormat, this.props.user.userID);
    }

    evaluateAddPlace = () => {
        let code = 1; //Ask for alias if everything is fine
        for (var i = 0; i < this.props.places.length; i++) {
            if(this.props.place.SiteId == this.props.places[i].location.id){
                code = 2; //Place already exists
                this.resetErrorMessage();
            }
        }
        this.setState({
            messageCode: code,
        });
    }

    render() {
        return (
            <div className="places-search-result-item">
                <div className="places-search-result-item-name">
                    {this.props.place.Name}
                </div>
                <div className="places-search-result-item-button button" onClick={this.evaluateAddPlace}>
                    Add
                </div>
                <form className="places-search-result-item-alias" onSubmit={this.addPlace}>
                    {this.state.messageCode === 1 ?
                        <input className="places-search-result-item-alias-field" type="text" placeholder="Alias"/>
                        : ""
                    }
                    {this.state.messageCode === 2 ?
                        <div className="place-error-message">
                            You already have this station in another alias dumbo!
                        </div> : ""
                    }
                </form>
                </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        user: state.user,
        places: state.places,
    }
}

export default connect(
    mapStateToProps,
    {addPlace},
)(PlacesSearchResultItem);
