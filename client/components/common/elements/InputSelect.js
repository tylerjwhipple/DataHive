import React from 'react';
import { Link, IndexLink } from 'react-router';

class InputDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.showDropdown = this.showDropdown.bind(this)
    this.checkClicked = this.checkClicked.bind(this)
    this.hideDropdown = this.hideDropdown.bind(this)
    this.state = {
      show: false,
      isSelectClicked: false,
      optionid: null,
      optionvalue: this.props.defaultoption
    }
  }

  showDropdown() {
      this.setState({
          show: true,
          isSelectClicked: true
      });
  }

  checkClicked() {
    if (this.state.isSelectClicked === false) {
      this.setState({
        show: false
    });
    }
    if (this.state.isSelectClicked === true) {
      this.setState({
        show: true
    });
    }
  }

  hideDropdown() {
    this.setState({
        show: false,
        isSelectClicked: false
    });
}

  updateDefaultValue(optionid, option) {
      this.setState({
        optionid,
        optionvalue: option,
        isSelectClicked: false,
        show: false
    });
    this.props.selectedoption(optionid);
  }

  getMaxOption(multiplier) {
    if (Object.keys(this.props.options).length === 0) {
      return 122;
    }
    else {
      return this.props.options.reduce(function (a, b) { return a.length > b.length ? a : b; }).optionlabel.length * multiplier;
    }
  }

  getOptions() {
    if (Object.keys(this.props.options).length === 0) {
      return (
      <div className="item">
        <span className="text">Please Search First</span>
      </div>
      );
  }
    return this.props.options.map((option) => {
      return (
        <div key={option.optionvalue} className="item" onClick={() => this.updateDefaultValue(option.optionvalue, option.optionlabel)}>
          <span className="text">{option.optionlabel}</span>
        </div>
      );
    }); 
    
  }

  render() {
    return (
      <div className={"input-dropdown" + (this.state.show ? " active" : "")} onMouseLeave={this.hideDropdown} onMouseEnter={this.checkClicked} >
      <div className="default" style={{width: this.getMaxOption(9) + 'px'}} onClick={this.showDropdown} >
        <div className="text" style={{width: this.getMaxOption(9) + 'px'}}>{this.state.optionvalue}</div>
        <i className="fa fa-chevron-down icon" aria-hidden="true"></i>
      </div>
      <div className={"menu" + (this.state.show + this.state.isSelectClicked ? "" : " hidden")}>
        {this.getOptions()}
      </div>
        {/*
        {this.state.show && (
        <div className="menu">
        {this.getOptions()}
        </div>
      )}
      */}
      </div>
    );
  }
}

export default InputDropdown;
