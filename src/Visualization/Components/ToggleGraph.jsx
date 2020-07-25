import React, { Component } from 'react';

let checkedStatus;

class ToggleGraph extends Component {

  constructor(props){
      super(props);
      this.state = {
        isChecked: true
       }
  }
  toggle = () => {
   checkedStatus = JSON.parse(localStorage.getItem("toggle"+this.props.togValue))
   this.setState({isChecked: !checkedStatus})
   localStorage.setItem("toggle"+this.props.togValue, !checkedStatus );
   this.props.updateGraph()
   
  }


  render() {
    const { isChecked } = this.state;

    return (
      <div >
          <input            className= "toggle-checkbox"
                            type="checkbox"
                            checked={isChecked}
                            onChange={this.toggle}
                        />

      </div>
    );
  }
}


export default ToggleGraph;