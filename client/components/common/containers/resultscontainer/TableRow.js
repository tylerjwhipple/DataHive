import React from 'react';
import { Link, IndexLink } from 'react-router';

class TableRow extends React.Component {

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
      <tr key={this.props.tablerow.id} onMouseOver={this.showDropdown} onMouseLeave={this.hideDropdown} onClick={this.props.showdetail} >
          <td className="checkbox-td">
              <input type="checkbox" name="name" value="1" />
          </td>
          <td className={"hover-td" + (this.state.show ? " active" : "")}></td>
          <td className="first-td">{this.props.tablerow.id}</td>
          <td>{this.props.tablerow.firstname}</td>
          <td>{this.props.tablerow.lastname}</td>
      </tr>
    );
  }
}

export default TableRow;
