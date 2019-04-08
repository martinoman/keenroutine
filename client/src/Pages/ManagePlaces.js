import React, {Component} from "react";
import { connect } from 'react-redux'
import PlacesSearch from '../Components/PlacesSearch'
import { removePlace, setIndex } from '../Actions/index';
import DraggableList from '../Components/DraggableList'
import { sortOnIndex } from "../Helpers/PlacesSorter.js"

class ManagePlaces extends Component {
    removePlace = (key) => {
        this.props.removePlace(key, this.props.user.userID);
    }

    formatPlaces = (place, index) => {
        return (
            <div className="place-row" key={index} id={place.key}>
                <div className="place-row-alias">
                    {place.alias}
                </div>
                <div className="place-row-adress">
                    {place.adress}
                </div>
                <div className="place-row-remove-button button" onClick={()=>this.removePlace(place.key)}>
                    x
                </div>
            </div>
        );
    }

    dragged(event){ //TODO can this be anywhere else?
        let toIndex = event.toIndex;
        let fromIndex = event.fromIndex;
        let draggedKey = event.target.childNodes[0].id;
        for (var i = 0; i < this.props.places.length; i++) {
            let place = this.props.places[i]

            if(toIndex < fromIndex && place.index >= toIndex && place.index < fromIndex){ //Shift up elems between to and from
                this.props.setIndex(place.index + 1, place.key, this.props.user.userID);
            }

            if(toIndex > fromIndex && place.index <= toIndex && place.index > fromIndex){ //Shift down elems between to and from
                this.props.setIndex(place.index - 1, place.key, this.props.user.userID);
            }

        }
        this.props.setIndex(toIndex,draggedKey , this.props.user.userID);
    }

    render() {
        return (
            <div className="manage_places_page">
                <DraggableList items={sortOnIndex(this.props.places)} format={this.formatPlaces.bind(this)} onChange={this.dragged.bind(this)}/>
                <PlacesSearch />
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
    {removePlace, setIndex},
)(ManagePlaces);
