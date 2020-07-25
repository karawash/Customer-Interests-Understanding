import React from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import * as moment from 'moment';
import "../../css/react-datepicker.css";
import { fakeData } from "../../Data";


class MenuSelectionHandler extends React.Component {
  constructor(props) {
    super(props)
 //   console.log('SelectionGroupId: ' ,this.props.SelectionGroupId)
    const selectionObject = JSON.parse(localStorage.getItem("selectionObject"+this.props.SelectionGroupId));
    this.state = selectionObject

    this.labelHandleChange = this.labelHandleChange.bind(this)
    this.categoryHandleChange = this.categoryHandleChange.bind(this)
    this.subcategoryHandleChange = this.subcategoryHandleChange.bind(this)
    this.advertiserHandleChange = this.advertiserHandleChange.bind(this)
    this.campaignHandleChange = this.campaignHandleChange.bind(this)
    this.lineitemHandleChange = this.lineitemHandleChange.bind(this)
    this.deviceHandleChange = this.deviceHandleChange.bind(this)
    this.datehandleChange = this.datehandleChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);

    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(this.state));

  }
  
  labelHandleChange(e) {
    this.setState({labelValue: e.target.value});
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.labelValue= e.target.value;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));

  }

  categoryHandleChange (categorySelectedOption) {
    this.setState({ categorySelectedOption: categorySelectedOption})

    // call subcategory API here using categorySelectedOption as input
   const subcategoryAPI = fakeData.subcategoryAPI;

    this.setState ({subcategoryOptions : subcategoryAPI})
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.categorySelectedOption= categorySelectedOption;
    rerenderLocalStorage.subcategoryOptions= subcategoryAPI;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));
   // console.log(`Option selected:`, categorySelectedOption);
  }

  subcategoryHandleChange = (subcategorySelectedOption) => {
   const advertiserAPI = fakeData.advertiserAPI;

    this.setState ({advertiserOptions : advertiserAPI})
    this.setState({ subcategorySelectedOption });
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.advertiserOptions= advertiserAPI;
    rerenderLocalStorage.subcategorySelectedOption= subcategorySelectedOption;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));
  //  console.log(`Option selected:`, subcategorySelectedOption);
  }
  
  advertiserHandleChange = (advertiserSelectedOption) => {
   const campaignAPI = fakeData.campaignAPI;

    this.setState ({campaignOptions : campaignAPI})
    this.setState({ advertiserSelectedOption });
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.campaignOptions= campaignAPI;
    rerenderLocalStorage.advertiserSelectedOption= advertiserSelectedOption;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));

  //  console.log(`Option selected:`, advertiserSelectedOption);
  }

  campaignHandleChange = (campaignSelectedOption) => {
   const lineitemAPI = fakeData.lineitemAPI;

    this.setState ({lineitemOptions : lineitemAPI})
    this.setState({ campaignSelectedOption });
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.lineitemOptions= lineitemAPI;
    rerenderLocalStorage.campaignSelectedOption= campaignSelectedOption;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));
 //   console.log(`Option selected:`, campaignSelectedOption);
  }

  lineitemHandleChange = (lineitemSelectedOption) => {
    this.setState({ lineitemSelectedOption });
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.lineitemSelectedOption= lineitemSelectedOption;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));
 //   console.log(`Option selected:`, lineitemSelectedOption);
  }

  deviceHandleChange = (deviceSelectedOption) => {
    this.setState({ deviceSelectedOption });
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.deviceSelectedOption= deviceSelectedOption;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));
 //   console.log(`Option selected:`, deviceSelectedOption);
  }

  datehandleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (moment().isAfter(startDate, endDate)) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate });
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.startDate= startDate;
    rerenderLocalStorage.endDate= endDate;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));

//    console.log(`Option selected:`, startDate);
//    console.log(`Option selected:`, endDate);
  };
  
  handleChangeStart = startDate => this.datehandleChange({ startDate });
  handleChangeEnd = endDate => this.datehandleChange({ endDate });
  
  
  
  render() {
    const customStyles = {
    control: (base, state) => ({
      ...base,
      height: '31px',
      'min-height': '31px',
      width: '200px',
      marginBottom: '10px',
    }),
    };

    return (
      <div className="MenuSelection">
        <div>
        <input type='text' className="MenuSelection-label" id='input' value={this.state.labelValue} onChange={this.labelHandleChange} />
        </div>
        <br/>
        <div>
      Category<br/>
      <Select
        styles={customStyles}
        value={this.state.categorySelectedOption}
        onChange={this.categoryHandleChange}
        options={this.state.categoryOptions}
      />
      </div>
      <div>
      Subcategory<br/>
      <Select
        styles={customStyles}
        value={this.state.subcategorySelectedOption}
        onChange={this.subcategoryHandleChange}
        options={this.state.subcategoryOptions}
      />
      </div>
      <div>
      advertiser<br/>
      <Select
        styles={customStyles}
        value={this.state.advertiserSelectedOption}
        onChange={this.advertiserHandleChange}
        options={this.state.advertiserOptions}
      />
      </div>
      <div>
      Campaign<br/>
      <Select
        styles={customStyles}
        value={this.state.campaignSelectedOption}
        onChange={this.campaignHandleChange}
        options={this.state.campaignOptions}
      />
      </div>
      <div>
      Lineitem<br/>
      <Select
        styles={customStyles}
        value={this.state.lineitemSelectedOption}
        onChange={this.lineitemHandleChange}
        options={this.state.lineitemOptions}
      />
      </div>
      <div>
      Device<br/>
      <Select
        styles={customStyles}
        value={this.state.deviceSelectedOption}
        onChange={this.deviceHandleChange}
        options={this.state.deviceOptions}
      />
      </div>
      
      <div>
      Start Date
      <DatePicker
        selected={moment(this.state.startDate).toDate()}
        selectsStart
        startDate={moment(this.state.startDate).toDate()}
        endDate={moment(this.state.endDate).toDate()}
        onChange={this.handleChangeStart}
      />
      <br/><br/>
      End Date
      <DatePicker
          selected={moment(this.state.endDate).toDate()}
          selectsEnd
          startDate={moment(this.state.startDate).toDate()}
          endDate={moment(this.state.endDate).toDate()}
          onChange={this.handleChangeEnd}
      />
      </div>
      
      </div>

    );
  }
}
export default MenuSelectionHandler;
