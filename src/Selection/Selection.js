import React from 'react';
import "../css/react-datepicker.css";
import SelectionHandle from "./Components/SelectionHandle";
import Checkbox from "./Components/Checkbox";
import { history } from '../Login/handlers/_helpers';
import { fakeData } from "../Data";


class Selection extends React.Component {
  
  constructor(props) {
    super(props)    
    if (localStorage.getItem("user") === null) {
      //redirect route to login page by default if no user logged on
      history.push("/Login")
    }
    this.state = {
      graph0 : [],
      graph1 : [],
      graph2 : [],
      graph3 : [],
      graph4 : [],

    }

    localStorage.setItem("graph0", JSON.stringify(this.state.graph0));
    localStorage.setItem("graph1", JSON.stringify(this.state.graph1));
    localStorage.setItem("graph2", JSON.stringify(this.state.graph2));
    localStorage.setItem("graph3", JSON.stringify(this.state.graph3));
    localStorage.setItem("graph4", JSON.stringify(this.state.graph4));
    localStorage.setItem("checkCount", "0");
    localStorage.setItem("selectionQueue", JSON.stringify([]));
    
    this.handleRun = this.handleRun.bind(this);



  }

  
  handleRun = () => {
  const selectionQueue = JSON.parse(localStorage.getItem("selectionQueue"))
  if(selectionQueue.length<=1){
    alert("You have two select two checkboxes in order to compare two groups")
    return;
  }

  this.props.history.push('/Visualization');

  const graphA = fakeData.graphA;
  const graphB = fakeData.graphB;
  
  /*const endpoint = `https://www.myapi.org/${value}`;

  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      // Do stuff with data and then call this.setState();
    });*/
    
  //  this.setState({graph0 : JSON.parse(localStorage.getItem("graph0"))});
  //  this.setState({graph1 : graphB});
  
  //console.log("length",selectionQueue.length);
  if(selectionQueue.length>0){
  localStorage.setItem("graph"+selectionQueue[0], JSON.stringify(graphA));
 // localStorage.setItem("tastegraphA", JSON.stringify(graphA))
  }
  if(selectionQueue.length>1){
  localStorage.setItem("graph"+selectionQueue[1], JSON.stringify(graphB))
  //localStorage.setItem("tastegraphB", JSON.stringify(graphB))
  }

  }
//    <Link to="/">Login</Link>
  
  render() {
    
    return (
    <div className="selection-body">
    <ul id="nav-ul">
              <li id="nav-li">
                  <a  id="nav-a"><img className ="profile-group" src={require('../img/profile.png')}/></a>
                  <ul id="nav-ul" class="dropdown">
                      <li id="nav-li"><a id="nav-a" href="/">home</a></li>
                      <li id="nav-li"><a  id="nav-a" href="/Login">Log out</a></li>
                  </ul>
              </li>
    </ul>

    <div className="selection-container">
    <div className="selection-item">
    <td>
     <Checkbox SelectionGroupId= {0} />
     </td><td>
     <SelectionHandle SelectionGroupId= {0} />
     </td>
     </div>
     <div className="selection-item">
     <td>
     <Checkbox SelectionGroupId= {1} />
     </td><td>
     <SelectionHandle SelectionGroupId= {1} />
     </td>
     </div>
     <div className="selection-item">
     <td>
     <Checkbox SelectionGroupId= {2} />
     </td><td>
     <SelectionHandle SelectionGroupId= {2} />
     </td>
     </div>
     <div className="selection-item">
     <td>
     <Checkbox SelectionGroupId= {3} />
     </td><td>
     <SelectionHandle SelectionGroupId= {3} />
     </td>
     </div>
     <div className="selection-item">
     <td>
     <Checkbox SelectionGroupId= {4} />
     </td><td>
     <SelectionHandle SelectionGroupId= {4} />
     </td>
     </div>
     <br/><br/>
     <button onClick={this.handleRun}>
        Run
      </button>
      </div>

     </div>

    );
  }
}
export default Selection;
