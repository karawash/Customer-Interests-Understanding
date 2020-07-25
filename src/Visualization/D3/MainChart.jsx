import React from 'react';
import * as MergeJson from 'merge-json';
let d3 = require("d3");


let commonObj;

class MainChart extends React.Component {
  constructor(props){
      super(props);
      this.drawChart = this.drawChart.bind(this);
   }

  componentDidMount() {
    this.drawChart();
    
  }

  componentDidUpdate() {
      d3.select(".svg").remove();
      this.drawChart();
      
     }
    
  drawChart() {
  let commonObjLength = 0; 
  commonObj.forEach(function (d) {
    if(showTaste(d)>0)
      commonObjLength++;
  });
  ////console.log(commonObjLength)
  ////// D3
// set the dimensions and margins of the graph
let margin = {top: 20, right: 20, bottom: 150, left: 40},
    width = commonObjLength*50 ,
    height = 500 - margin.top - margin.bottom;

// set the ranges
let x = d3.scaleBand()
          .range([0, width])
          .padding(1);
let y = d3.scaleLinear()
          .range([height, 0]);

let svg = d3.select("#main_graph").append("svg")
    .attr("class", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
  
  function showTaste(d){return d.activeTasteA*d.activeScoreA*d.activeEngagementA*d.activeTasteB*d.activeScoreB*d.activeEngagementB};
  // Scale the range of the dataA in the domains
  x.domain(commonObj.map(function(d) {  if(showTaste(d)>0) { return d.tasteA;}   }));

  y.domain([0, d3.max(commonObj, function(d) { if(showTaste(d)>0) {return d.scoreA+300; }  })]);

  svg.selectAll(".lines")
      .data(commonObj)
    .enter().append("line")
    .attr("class", "line")
    .attr("x1", function(d) { if(showTaste(d)>0) {return x(d.tasteA); }  } )
    .attr("y1", function (d) { if(showTaste(d)>0) {return y(d.scoreA); }   })
    .attr("x2", function(d) { if(showTaste(d)>0) {return x(d.tasteA); }   } )
    .attr("y2", function (d) { if(showTaste(d)>0) {return y(d.scoreB); }   })
    .style("stroke-width", 2)
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke", function(d) {
            if (d.scoreA < d.scoreB) {return "red"}
            else  { return "black" }
        ;});
    
  // append the circles for the scatter chart
  svg.selectAll(".circlesA")
      .data(commonObj)
    .enter().append("circle")
      .attr("class", "circleA")
      .attr("cx", function(d) { if(showTaste(d)>0) {return x(d.tasteA); }   })
      .attr("cy", function (d) { if(showTaste(d)>0) {return y(d.scoreA); }   } )
      .attr("r", function (d) { if(showTaste(d)>0) {return d.engagementA/200; }   })
      .style("fill", function (d) { if(showTaste(d)>0) {return 'black'; }   } );

  svg.selectAll(".circlesB")
      .data(commonObj)
    .enter().append("circle")
      .attr("class", "circleB")
      .attr("cx", function(d) { if(showTaste(d)>0) { return x(d.tasteB); }   })
      .attr("cy", function (d) { if(showTaste(d)>0) { return y(d.scoreB); }   } )
      .attr("r", function (d) { if(showTaste(d)>0) { return d.engagementB/200; }   })
      .style("fill", function (d) { if(showTaste(d)>0) { return 'red'; }   } );

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
   .selectAll("text")
    .attr("class", "text")
      .style("text-anchor", "end")
    .style("font-size", "1.2em")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" )

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y))
  
  //Apply checkbox toggle
  let checkedStatusA = JSON.parse(localStorage.getItem("toggleA"))
  let checkedStatusB = JSON.parse(localStorage.getItem("toggleB"))
  let activeA   = checkedStatusA ? false : true ,
      newOpacityA = activeA ? 0 : 1;
  let activeB   = checkedStatusB ? false : true ,
      newOpacityB = activeB ? 0 : 1;
  svg.selectAll(".circleA").style("opacity", newOpacityA);
  svg.selectAll(".line").style("opacity", newOpacityA*newOpacityB);    
  svg.selectAll(".circleB").style("opacity", newOpacityB);
      

  }
        
  render(){
  let objA= [], objB = [];  
  commonObj=[];
  let tastegraphA = JSON.parse(localStorage.getItem("tastegraphA")), 
  tastegraphB = JSON.parse(localStorage.getItem("tastegraphB"));

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

return (
    <div id ="main_graph">  </div>

    );
  }
   
}
    
export default MainChart;