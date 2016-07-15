import React from 'react';
import agGrid from './ag-grid.js'
import agTable from './es-react.js'

export default class App extends React.Component{

  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.state = {
      items: this.props.items,
      disabled: true
    };
  }

  componentDidMount() {
    this.setState({
      disabled: false
    })
  }

  handleClick() {
    this.setState({
      items: this.state.items.concat('Item ' + this.state.items.length)
    })
  }

  render() {
    return (
      <div>
        <div id="tableDiv">ss</div>
        <button onClick={this.handleClick.bind(this)} disabled={this.state.disabled}>Add Item</button>
        <ul>
        {
          this.state.items.map(function(item) {
            return <li>{item}</li>
          })
        }
        </ul>
      </div>
    )
  }
};
