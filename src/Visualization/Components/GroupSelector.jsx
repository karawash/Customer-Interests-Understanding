import React from 'react';
import Select from 'react-select';

let selectionQueue = [], value1, value2, 
selection1=[0,1,2,3,4], selection2=[0,1,2,3,4]
class GroupSelector extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selection1: selection1,
      selection2: selection2,
    }

    selectionQueue = JSON.parse(localStorage.getItem("selectionQueue"));
    value1 = parseInt(selectionQueue[0])
    value2 = parseInt(selectionQueue[1])
    //console.log('selectionQueue',selectionQueue)
    
    
    let sel1 = selection1.filter(function(value, index, arr){
        return value !== value1;
    });
    
    let sel2 = selection2.filter(function(value, index, arr){
        return value !== value2;
    });
    

    //console.log('selection1',sel1)
    //console.log('selection2',sel2)
 }
  
  render() {

    return (
      <div>
        <div className="groupSelectors">
      Selection1<br/>
      <Select
        value={this.state.categorySelectedOption}
        onChange={this.HandleChange}
        options={[]}
      />
      </div>
      <div className="groupSelectors">
      Selection2<br/>
      <Select
        value={this.state.subcategorySelectedOption}
        onChange={this.HandleChange}
        options={[]}
      />
      </div>
            
      </div>

    );
  }
}
export default GroupSelector;
