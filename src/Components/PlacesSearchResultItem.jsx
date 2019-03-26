import React, {Component} from "react";
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';

class PlacesSearchResultItem extends Component {

    constructor(props){
        super(props);
        this.db = firebase.database().ref().child('users');
        this.state = {
            inputAlias: false,
        }
    }

    addPlace = event => {
        event.preventDefault();
        this.setState({inputAlias:false});
        let alias = event.target[0].value;
        let placeDBFormat = {
            [alias]:{
                ID: this.props.place.SiteId,
                X: this.props.place.X,
                Y: this.props.place.Y,
            }
        }
        this.db.child(this.props.user.userID).push().set(placeDBFormat);
    }



    render() {
        return (
            <div className="places-search-result-item">
                <div className="places-search-result-item-name">
                    {this.props.place.Name}
                </div>
                <div className="places-search-result-item-button button" onClick={()=>{this.setState({inputAlias: true})}}>
                    Add
                </div>
                <form className="places-search-result-item-alias" onSubmit={this.addPlace}>
                    {this.state.inputAlias ?
                        <input className="places-search-result-item-alias-field" type="text" placeholder="Alias"/>
                        :""}
                    </form>
                </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        user: state.user,
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlacesSearchResultItem);
