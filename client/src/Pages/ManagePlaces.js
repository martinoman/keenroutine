import React, {Component} from "react";
import { connect } from 'react-redux'
import PlacesSearch from '../Components/PlacesSearch'
import { removePlace, setIndex } from '../Actions/index';
import SortableComponent from '../Components/SortableComponent.jsx'
import { sortOnIndex } from "../Helpers/PlacesHelper.js"
import { Container, Col, Row } from "reactstrap";
import { IconContext } from "react-icons";
import { IoIosRemoveCircleOutline } from "react-icons/io";

class ManagePlaces extends Component {
    removePlace = (key) => {
        this.props.removePlace(key, this.props.user.userID);
    }

    changeOrder(newOrder){
        for (var i = 0; i < newOrder.length; i++) {
            let key = newOrder[i];
            this.props.setIndex(i, key, this.props.user.userID);
        }
    }

    formatPlace = (place) => {
        return(
            <Row className="draggable-list-item keen-card align-center" key={place.key}>
                <Col xs={8} className="draggable-list-item-alias">
                    {place.alias}
                </Col>
                <Col xs={4} className="draggable-list-item-remove-button">
                    <button className="button place-remove-button" onClick={()=>{
                            this.removePlace(place.key);
                        }}>
                        <IoIosRemoveCircleOutline className="remove-icon"/>
                    </button>
                </Col>
            </Row>
        );
    }

    render() {
        let places = sortOnIndex(this.props.places).map((place)=>{return this.formatPlace(place)});
        return (
            <Container className="Manage-places">
                <Row>
                    <Col xs={{size:10, offset:1}}>
                        <div className="title">
                            Your places
                        </div>
                        <SortableComponent places={places} onChange={this.changeOrder.bind(this)}/>
                        <PlacesSearch />
                    </Col>
                </Row>
            </Container>
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
