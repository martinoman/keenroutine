import React, {Component} from 'react';
import { connect } from 'react-redux'
import {render} from 'react-dom';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { Container, Col} from "reactstrap";

const SortableItem = SortableElement(({value}) => <div className="draggable">{value}</div>);

const SortableList = SortableContainer(({places}) => {
  return (
    <div className="draggable-list">
      {places.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
  </div>
  );
});

class SortableComponent extends Component {
  constructor(props){
      super(props);
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    let places = [...this.props.places];
    places = this.shiftArray(places, oldIndex, newIndex);
    let newOrder = places.map((place) => { return place.key});
    this.props.onChange(newOrder);
  };

  shiftArray = (array, oldIndex, newIndex) => {
      array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
      return array; // for testing
  };

    render() {
        return(
            <SortableList places={this.props.places} onSortEnd={this.onSortEnd} lockAxis="y"/>
        )
    }
}
export default SortableComponent;
