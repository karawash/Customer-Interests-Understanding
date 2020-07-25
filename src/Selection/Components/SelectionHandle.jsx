import React from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import * as moment from 'moment';
import "../../css/react-datepicker.css";
import { fakeData } from "../../Data";

class SelectionHandle extends React.Component {
  constructor(props) {
    super(props)
    //console.log('SelectionGroupId: ' ,this.props.SelectionGroupId)
    localStorage.setItem("SelectionGroupId", this.props.SelectionGroupId);
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(this.state));


    const categoryAPI = fakeData.categoryAPI;
    const deviceAPI = fakeData.deviceAPI;
    this.state = {
      SelectionGroupId: this.props.SelectionGroupId,
      SelectionGroupName: "Selection group name",
      categorySelectedOption: { value: 0, label: 'All' },
      categoryOptions : categoryAPI,
      subcategorySelectedOption: { value: 0, label: 'All' },
      subcategoryOptions : [{}],
      advertiserSelectedOption: { value: 0, label: 'All' },
      advertiserOptions : [{}],
      campaignSelectedOption: { value: 0, label: 'All' },
      campaignOptions : [{}],
      lineitemSelectedOption: { value: 0, label: 'All' },
      lineitemOptions : [{}],
      deviceSelectedOption: { value: 0, label: 'All' },
      deviceOptions : deviceAPI,
      startDate: new Date(),
      endDate: new Date(),
      labelValue : ' Group x',
      isChecked: false,


      
    }

    this.labelHandleChange = this.labelHandleChange.bind(this);
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
    //console.log(`Option selected:`, categorySelectedOption);
  }

  subcategoryHandleChange = (subcategorySelectedOption) => {
   const advertiserAPI = fakeData.advertiserAPI;

    this.setState ({advertiserOptions : advertiserAPI})
    this.setState({ subcategorySelectedOption });
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.advertiserOptions= advertiserAPI;
    rerenderLocalStorage.subcategorySelectedOption= subcategorySelectedOption;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));
    //console.log(`Option selected:`, subcategorySelectedOption);
  }
  
  advertiserHandleChange = (advertiserSelectedOption) => {
   const campaignAPI = fakeData.campaignAPI;
    this.setState ({campaignOptions : campaignAPI})
    this.setState({ advertiserSelectedOption });
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.campaignOptions= campaignAPI;
    rerenderLocalStorage.advertiserSelectedOption= advertiserSelectedOption;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));

    //console.log(`Option selected:`, advertiserSelectedOption);
  }

  campaignHandleChange = (campaignSelectedOption) => {
   const lineitemAPI = fakeData.lineitemAPI;
    this.setState ({lineitemOptions : lineitemAPI})
    this.setState({ campaignSelectedOption });
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.lineitemOptions= lineitemAPI;
    rerenderLocalStorage.campaignSelectedOption= campaignSelectedOption;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));
    //console.log(`Option selected:`, campaignSelectedOption);
  }

  lineitemHandleChange = (lineitemSelectedOption) => {
    this.setState({ lineitemSelectedOption });
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.lineitemSelectedOption= lineitemSelectedOption;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));
    //console.log(`Option selected:`, lineitemSelectedOption);
  }

  deviceHandleChange = (deviceSelectedOption) => {
    this.setState({ deviceSelectedOption });
    let rerenderLocalStorage = this.state;
    rerenderLocalStorage.deviceSelectedOption= deviceSelectedOption;
    localStorage.setItem("selectionObject"+this.props.SelectionGroupId, JSON.stringify(rerenderLocalStorage));
    //console.log(`Option selected:`, deviceSelectedOption);
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

//    //console.log(`Option selected:`, startDate);
//    //console.log(`Option selected:`, endDate);
  };
  
  handleChangeStart = startDate => this.datehandleChange({ startDate });
  handleChangeEnd = endDate => this.datehandleChange({ endDate });
  
  
  
  render() {

    return (
      <div className="selection-handle">
        <td>
        <div>
        {this.state.labelValue}<br/>
        <input className="input-text" type='text' id='input' value={this.state.labelValue} onChange={this.labelHandleChange} />
        </div>
        </td>
        <td>
        <div>
        Category<br/>
      <Select className="selection-option"
        value={this.state.categorySelectedOption}
        onChange={this.categoryHandleChange}
        options={this.state.categoryOptions}
      />
      </div>
      </td>
      <td>
      <div>
      Subcategory<br/>
      <Select className="selection-option"
        value={this.state.subcategorySelectedOption}
        onChange={this.subcategoryHandleChange}
        options={this.state.subcategoryOptions}
      />
      </div>
      </td>
      <td>
      <div>
      advertiser<br/>
      <Select className="selection-option"
        value={this.state.advertiserSelectedOption}
        onChange={this.advertiserHandleChange}
        options={this.state.advertiserOptions}
      />
      </div>
      </td>
      <td>
      <div>
      Campaign<br/>
      <Select className="selection-option"
        value={this.state.campaignSelectedOption}
        onChange={this.campaignHandleChange}
        options={this.state.campaignOptions}
      />
      </div>
      </td>
      <td>
      <div>
      Lineitem<br/>
      <Select className="selection-option"
        value={this.state.lineitemSelectedOption}
        onChange={this.lineitemHandleChange}
        options={this.state.lineitemOptions}
      />
      </div>
      </td>
      <td>
      <div>
      Start:
      <DatePicker className="date-selection"
        selected={this.state.startDate}
        selectsStart
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onChange={this.handleChangeStart}
      />
      End:
      <DatePicker className="date-selection"
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
      />
      </div>
      </td>
      <td>
      <div>
      Device<br/>
      <Select className="selection-option"
        value={this.state.deviceSelectedOption}
        onChange={this.deviceHandleChange}
        options={this.state.deviceOptions}
      />
      </div>
      </td>
      </div>

    );
  }
}
export default SelectionHandle;
