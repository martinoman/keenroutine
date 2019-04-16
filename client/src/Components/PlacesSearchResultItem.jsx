import React, {Component} from "react";
import { connect } from 'react-redux'
import { addPlace } from '../Actions/index.js'
import _ from "lodash"
import { Row, Col} from "reactstrap"
class PlacesSearchResultItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            messageCode: 0, //0: nominal, 1: enter alias, 2: place already exists
        }
    }

    componentWillReceiveProps(nextProps){ //Otherwise the divs in the list might behave odd ad persist states from the last search
        this.setState({
            messageCode: 0,
        });
    }

    resetPopup = _.debounce(() => {
        this.setState({
            expanded:false,
            messageCode: 0,
        }); //TODO This is jerky and not pretty
    }, 3000);

    addPlace = event => {
        this.setState({
            expanded: false,
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
        this.props.scrollToTop();
    }

    evaluateAddPlace = () => {
        let code = 1; //Ask for alias if everything is fine
        let expanded = !this.state.expanded;
        for (var i = 0; i < this.props.places.length; i++) {
            if(this.props.place.SiteId === this.props.places[i].location.id){
                code = 2; //Place already exists
                this.resetPopup();
            }
        }
        this.setState({
            messageCode: code,
            expanded: expanded,
        });
    }

    render() {
        let code = this.state.messageCode;
        return (
            <div className={"search-result-item-card keen-card " + (this.state.expanded ? "expanded" : "")}>
                <Row className="search-result-item">
                    <Col xs={8} className="search-result-item-name">
                        {this.props.place.Name}
                    </Col>
                    <Col xs={4}>
                        <button className="search-result-item-button button" onClick={this.evaluateAddPlace}>
                            Add
                        </button>
                    </Col>
                </Row>
                <Row className={"search-result-item-popup " + (this.state.expanded ? "expanded" : "")}>
                    <Col xs={{size:10, offset:1}} className="search-result-item-popup-content">
                        {code === 2 ?
                            <div className="place-error-message">
                                You already have this station in another alias dumbo!
                            </div>
                        :""
                        }
                        {code === 1 ?
                            <form className="search-result-item-alias" onSubmit={this.addPlace}>
                                <div className="">
                                    Please enter an alias
                                </div>
                                <input className="search-result-item-alias-field" type="text" placeholder="Alias"/>
                            </form>
                        :""
                        }
                    </Col>
                </Row>
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
