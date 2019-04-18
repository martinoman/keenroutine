import React, {Component} from "react";
import { connect } from 'react-redux'
import {Link, withRouter} from "react-router-dom";


/**
This component wraps any list of places for some robustness
If there are no added places it informs the user.
You can specify "link" and "empty" as attributes.
Link provides a link to manage_places. Empty prompts this component to show no error message if there are no places
*/
class PlacesListWrapper extends Component {

    renderErrorMessage(){
        return(
            <>
                <p className="title">
                    You don't have any places added.
                </p>
                {this.props.link?
                    <Link to="/manage_places">
                        <button className="button add-more-places-button"> Add more! </button>
                    </Link>
                :
                    ""
                }
            </>
        );
    }

    render() {
        return(
            <div className="no-places-info">
                {this.props.places.length > 0 ?
                    this.props.children
                :
                    this.props.empty ?
                        ""
                    :
                        this.renderErrorMessage()
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        places: state.places,
    }
}

export default withRouter(connect(
    mapStateToProps,
    {},
)(PlacesListWrapper));
