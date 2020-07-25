import React from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import ScoreSlider from "./Components/ScoreSlider";
import EngagmentSlider from "./Components/EngagmentSlider";
import MenuSlider from "./Components/MenuSlider";
import '../css/general.css';
import { history } from '../Login/handlers/_helpers';
import GroupSelector from "./Components/GroupSelector";
import { fakeData } from "../Data";
import MainChart from "./D3/MainChart";
import ToggleGraph from "./Components/ToggleGraph";






let selectionQueue = []
let tastegraphA = []
let tastegraphB = []
let tree = []

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    if (localStorage.getItem("user") === null) {
      //redirect route to login page by default if no user logged on
      history.push("/Login")
    }
    selectionQueue = JSON.parse(localStorage.getItem("selectionQueue"));
    tastegraphA = JSON.parse(localStorage.getItem("graph"+selectionQueue[0]));
    tastegraphB = JSON.parse(localStorage.getItem("graph"+selectionQueue[1]));
    localStorage.setItem("tastegraphA", JSON.stringify(tastegraphA));
    localStorage.setItem("tastegraphB", JSON.stringify(tastegraphB));
    localStorage.setItem("toggleA", true );
    localStorage.setItem("toggleB", true );

//    this.state = {  
//    }
  
  this.initGraphs = this.initGraphs.bind(this);
  this.onTreeSelectChange = this.onTreeSelectChange.bind(this);
  tree= this.treeInit();
  this.updateGraph = this.updateGraph.bind(this);  

  }

  initGraphs(){
   selectionQueue = JSON.parse(localStorage.getItem("selectionQueue"))
   tastegraphA = JSON.parse(localStorage.getItem("graph"+selectionQueue[0]))
   tastegraphB = JSON.parse(localStorage.getItem("graph"+selectionQueue[1]))  
   localStorage.setItem("tastegraphA", JSON.stringify(tastegraphA))
   localStorage.setItem("tastegraphB", JSON.stringify(tastegraphB))

  }

  //this.initGraphs();
  
treeInit(){
  // Don't forget to append '/' at beginning of every element in the taxonomy list
  const taxonomyList = fakeData.taxonomy;
  //["/art and entertainment", `"/finance"/investing`,"/finance/stocks","/business and industrial/energy"]      
  const treeData = this.buildTree(taxonomyList, true)
  return treeData;
  }


buildTree(pathes, defaultValue) {
  let currentPath, lastPath, node, parent, map = {
      "": {
        children: []
      }
    },
    stack = [""]

  for (let path of pathes) {
    let nodes = path.split("/");
    for (let i = 0; i < nodes.length; i++) {
      currentPath = "/" + nodes.slice(1, i + 1).join("/")
      lastPath = stack[stack.length - 1]
      parent = map[lastPath]
      if (!map[currentPath]) {
        if (currentPath === "/"){
          node = {
            id: "All Tastes",
            label: "All Tastes", 
            value: "All Tastes",
            checkbox: defaultValue,
            checked: defaultValue,
            expanded: defaultValue,
            children: []
          }
        }
        else{
        node = {
          id: currentPath.substring(1), // remove first character '/'
          label: currentPath.match(/([^\/]*)\/*$/)[1], // last name in the URI path
          value: currentPath.match(/([^\/]*)\/*$/)[1], // last name in the URI path
          checkbox: defaultValue,
          checked: defaultValue,
         // expanded: defaultValue,
          children: []
        }
      }
        parent.children.push(node);
        map[currentPath] = node;
      }

      stack.push(currentPath)
    }
    stack = stack.slice(0, 1)
  }
  return map[""].children[0];
}

onTreeSelectChange = (currentNode, selectedNodes) => {
  
    tastegraphA = JSON.parse(localStorage.getItem("tastegraphA"))
    tastegraphB = JSON.parse(localStorage.getItem("tastegraphB"))

    tastegraphA.filter(function(element1){
        if(element1.taste.includes(currentNode.id)){
          element1.activeTaste = currentNode.checked
          //this.printList(currentNode.children);
        }
        if(currentNode.value === "All Tastes"){
          element1.activeTaste = currentNode.checked
        }
      })
    tastegraphB.filter(function(element2){
        if(element2.taste.includes(currentNode.id)){
          element2.activeTaste = currentNode.checked
        }
        if(currentNode.value === "All Tastes"){
          element2.activeTaste = currentNode.checked
        }
      })
    
  localStorage.setItem("tastegraphA", JSON.stringify(tastegraphA));
  localStorage.setItem("tastegraphB", JSON.stringify(tastegraphB));
  this.child.current.forceUpdate();
  
}
  updateGraph(){
    this.child.current.forceUpdate();
  }

/*  refresh(){
      //console.log( "refresh!");
      this.forceUpdate();
    }
*/

//add to render to go back to selection page if needed
//<Link to="/Selection">Selection</Link>
     
  render() {

   
    return (
      <div className="Visualization-body" >
      <ul id="nav-ul">
              <li id="nav-li">
                  <a  id="nav-a"><img className ="profile-group" src={require('../img/profile.png')}/></a>
                  <ul id="nav-ul" class="dropdown">
                      <li id="nav-li"><a id="nav-a" href="/">home</a></li>
                      <li id="nav-li"><a  id="nav-a" href="/Login">Log out</a></li>
                  </ul>
              </li>
      </ul>
      
      <div className="center"> 
      <div className="center_container">
      <GroupSelector/>
      </div>
      <div className="center_container">
      <MainChart ref={this.child} />
      </div>
      </div>
      <div className="right_menu">
      <div className="toggle-container">
      SELECTION-I:
      <ToggleGraph togValue={"A"} updateGraph={this.updateGraph}/>
      SELECTION-II:
      <ToggleGraph togValue={"B"} updateGraph={this.updateGraph}/>
      </div>
      <div className="separator">Filters</div>
      <div className="filter_menu">
      <span>Score</span>
      <ScoreSlider updateGraph={this.updateGraph}/>
      <span>Engagment</span>
      <EngagmentSlider updateGraph={this.updateGraph}/>
      </div>
      <div className="separator">Taste Groups</div>
      <div className="filter_taxonomy">
      <DropdownTreeSelect data={[tree]} onChange={this.onTreeSelectChange} />
      </div>
      </div>
      <div className="left_menu">
      <div className="left_menu_container">
      <MenuSlider /> 
      </div>
      </div>
      </div>

    );
  }
}
export default Visualization;
