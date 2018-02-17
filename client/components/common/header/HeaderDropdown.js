import React from 'react';
import { Link, IndexLink } from 'react-router';

class HeaderDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.showDropdown = this.showDropdown.bind(this)
    this.hideDropdown = this.hideDropdown.bind(this)
    this.state = {
      show: false
    }
  }

  showDropdown() {
      this.setState({
          show: true
      });
  }

  hideDropdown() {
      this.setState({
          show: false
      });
  }

  render() {
    return (
      <div className="hd-dropdown" onClick={this.showDropdown} onMouseLeave={this.hideDropdown}>
      <div className={"default " + this.props.status}>
        <i className="fa fa-search icon-right" aria-hidden="true"></i>
        <div className="text">{this.props.selected}</div>
        <i className="fa fa-chevron-down icon" aria-hidden="true"></i>
      </div>
      {this.state.show && (
        <div className="menu">
              {this.props.children}
        </div>
      )}
      </div>
    );
  }
}

export default HeaderDropdown;
