import React, { Component } from 'react';

class TaxonomyCheckbox extends Component {
  state = {
    isChecked: true,
  }

  activateCheckbox = () => {

   
   this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
    const item = this.props.item
    const isChecked = this.state.isChecked

    let tastegraphA = JSON.parse(localStorage.getItem("tastegraphA"))
    let tastegraphB = JSON.parse(localStorage.getItem("tastegraphB"))

    tastegraphA.forEach(function(element){
        if(element.taste === item.taste){
          element.activeTaste = !isChecked
        }
      })
    tastegraphB.forEach(function(element){
        if(element.taste === item.taste){
          element.activeTaste = !isChecked
        }
      })

    //console.log( "tastegraphA:", tastegraphA);
    //console.log( "tastegraphB:", tastegraphB);

    localStorage.setItem("tastegraphA", JSON.stringify(tastegraphA));
    localStorage.setItem("tastegraphB", JSON.stringify(tastegraphB));
    this.props.refresh();
  }

  render() {
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={this.activateCheckbox}
                        />

      </div>
    );
  }
}


export default TaxonomyCheckbox;