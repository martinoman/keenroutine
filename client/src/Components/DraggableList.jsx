import React, {Component} from "react";
import SortableComponent from "./SortableComponent.jsx"
class DraggableList extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }
  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }
  dragEnd(e) {
    this.dragged.style.display = 'block';

    // update state
    var data = this.state.items;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({items: data});
    this.props.onChange({
        target: this.dragged,
        toIndex: to,
        fromIndex: from,
    });
  }
  dragEnd2(e) {
    console.log(e);
  }
  dragOver(e) {
    this.over = e.target.parentNode.parentNode; //TODO this is bad, you should feel bad
  }
	render2() {
		return (
            <div>
    			<ul onDragOver={this.dragOver.bind(this)}>
                    {this.props.items.map((item, i) => {
                      return (
                        <li
                          data-id={i}
                          key={i}
                          draggable='true'
                          onDragEnd={this.dragEnd.bind(this)}
                          onDragStart={this.dragStart.bind(this)}>{this.props.format(item, i)}</li>
                      )
                     })}
                </ul>
            </div>
		)
	}

    render(){
        return(
            <SortableComponent />
        );
    }
}
export default DraggableList;
