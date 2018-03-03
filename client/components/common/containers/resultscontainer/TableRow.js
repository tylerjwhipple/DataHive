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


  getTableRows() {
    return Object.entries(this.props.tablerow).map((name, index) => {
        if (this.props.exclude.indexOf(name[0]) === -1){
            if (index === 1) {
                return (
                    <td key={index} className="first-td">{name[1]}</td>
                );
            }
                return (
                    <td key={index}>{name[1]}</td>
                );
        }
    }); 
  }

  render() {
    return (
      <tr key={this.props.primaryid} onMouseOver={this.showDropdown} onMouseLeave={this.hideDropdown} onClick={this.props.showdetail} >
          <td className="checkbox-td">
              <input type="checkbox" name="name" value={this.props.primaryid} />
          </td>
          <td className={"hover-td" + (this.state.show ? " active" : "")}></td>
          {this.getTableRows()}
      </tr>
    );
  }
}

export default TableRow;
