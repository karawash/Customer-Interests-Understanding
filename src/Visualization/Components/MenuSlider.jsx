import React, { Component } from 'react';
import "../../css/carousel.css";
import { Carousel } from 'react-responsive-carousel';
import MenuSelectionHandler from "../Components/MenuSelectionHandler";

/*
it was as below from react-responsive-carousel'
<div>
  <img />
  <p className="legend">Legend 3</p>
</div>
*/

class MenuSlider extends Component {

  constructor(props) {
    super(props)    

  this.handleRun = this.handleRun.bind(this);

}


  handleRun = () => {

  //console.log(moment('2019-04-27T03:39:55.367Z').format('YYYY-MM-DD-h:mm:ss'))

  }

    render() {
        return (
          <div>
            <Carousel showIndicators={false} showThumbs={false} showStatus={false}>
                <div>
                    <img />
                    <div className="group_selections legend">
                    <MenuSelectionHandler SelectionGroupId= {0} />
                    <br/>
                    <button onClick={this.handleRun}>
                      Update
                    </button>
                    </div>
                </div>
                <div>
                    <img />
                    <div className="group_selections legend">
                    <MenuSelectionHandler SelectionGroupId= {1} />
                    <br/>
                    <button onClick={this.handleRun}>
                      Update
                    </button>
                    </div>
                    
                </div>
                <div>
                    <img />
                    <div className="group_selections legend">
                    <MenuSelectionHandler SelectionGroupId= {2} />
                    <br/>
                    <button onClick={this.handleRun}>
                      Update
                    </button>
                    </div>
                    
                </div>
                <div>
                    <img />
                    <div className="group_selections legend">
                    <MenuSelectionHandler SelectionGroupId= {3} />
                    <br/>
                    <button onClick={this.handleRun}>
                      Update
                    </button>
                    </div>
                    
                </div>
                <div>
                    <img />
                    <div className="group_selections legend">
                    <MenuSelectionHandler SelectionGroupId= {4} />
                    <br/>
                    <button onClick={this.handleRun}>
                      Update
                    </button>
                    </div>
                    
                </div>
            </Carousel>
      </div>
        );
    }
}

export default MenuSlider;