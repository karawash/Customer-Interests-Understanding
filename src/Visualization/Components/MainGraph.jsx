import React from 'react';
import * as MergeJson from 'merge-json';
let d3 = require("d3");


let tastegraphA = JSON.parse(localStorage.getItem("tastegraphA")), 
tastegraphB = JSON.parse(localStorage.getItem("tastegraphB"));

class MainGraph extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      tastegraphA : tastegraphA,
      tastegraphB : tastegraphB,
      dumy: false,
    }



  }
  
  update(){
    tastegraphA = JSON.parse(localStorage.getItem("tastegraphA"))
    tastegraphB = JSON.parse(localStorage.getItem("tastegraphB"))
    this.setState({tastegraphA: tastegraphA, tastegraphB : tastegraphB});
  }
  
  render() {



    function renameKeys(obj, newKeys) {
      const keyValues = Object.keys(obj).map(key => {
        const newKey = newKeys[key] || key;
        return { [newKey]: obj[key] };
      });
      return Object.assign({}, ...keyValues);
    }

    const newKeysA = { score: "scoreA", taste: "tasteA", engagement: "engagementA", activeEngagement: "activeEngagementA",
    activeScore: "activeScoreA", activeTaste: "activeTasteA"};
    const newKeysB = { score: "scoreB", taste: "tasteB", engagement: "engagementB", activeEngagement: "activeEngagementB",
    activeScore: "activeScoreB", activeTaste: "activeTasteB"};

    let objA= [], objB = [], commonObj = []

    tastegraphA.filter(function(element){
      element = renameKeys(element, newKeysA);
      objA.push(element)
    })

    tastegraphB.filter(function(element){
      element = renameKeys(element, newKeysB);
      objB.push(element)
    })

    objA.filter(function(elementA){
      objB.filter(function(elementB){
       if(elementA.tasteA === elementB.tasteB)
        commonObj.push(MergeJson.merge(elementA, elementB))
      })
    })

//console.log(commonObj);

    return (
      <div>
      </div>

    );
  }
}
export default MainGraph;
