import React, { Component } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: false,
    checkCount: 0
  }

  toggleCheckboxChange = () => {

   const limit = 2;
   let selectionQueue= JSON.parse(localStorage.getItem("selectionQueue"))
   let checkCount = localStorage.getItem("checkCount");
   if(!this.state.isChecked){
    checkCount++;
    selectionQueue.push(JSON.stringify(this.props.SelectionGroupId));
    //console.log(selectionQueue);
   }
   else{
      checkCount--;
      const valueToRemove = JSON.stringify(this.props.SelectionGroupId)
      selectionQueue = selectionQueue.filter(function(item) {
        return item !== valueToRemove
      })
      //console.log("splice:",selectionQueue);

      
   }

   if (checkCount>limit){
      alert("You can only select a maximum of "+limit+" checkboxes")
      this.setState(({ isChecked }) => (
      {
        isChecked: false,
      }
      ));
      return;
      }

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    this.setState(({ checkCount }) => (
      {
        checkCount: checkCount,
      }
    ));
    localStorage.setItem("checkCount", checkCount);
    let SelectionObject= JSON.parse(localStorage.getItem("selectionObject"+this.props.SelectionGroupId));
    SelectionObject.isChecked= !this.state.isChecked;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(SelectionObject));
    localStorage.setItem("selectionQueue", JSON.stringify(selectionQueue));
    


  }

  render() {
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
          <input            className= "checkbox-group"
                            type="checkbox"
                            checked={isChecked}
                            onChange={this.toggleCheckboxChange}
                        />

      </div>
    );
  }
}


export default Checkbox;