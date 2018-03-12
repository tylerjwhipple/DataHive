import React from 'react';
import { Link, IndexLink } from 'react-router';

class TableRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkbox: false,
      rowdata: []
    }
    let primaryid = null
  }

  checkIfActiveCheckbox(primaryid) {
    return this.props.exceldata.findIndex(function(el) {return el.visitsId === primaryid;}) !== -1;
}

  checkIfActiveCheckbox1(primaryid) {
    return this.props.exceldata.indexOf(primaryid) !== -1
}

getCheckboxIndex(primaryid) {
    return this.props.exceldata.findIndex(function(el) {return el.visitsId === primaryid;})
}

activateCheckbox(primaryid) {
    this.state.checkbox ? this.setState({checkbox: false}) : this.setState({checkbox: true});
    let index = this.getCheckboxIndex(primaryid);
    index !== -1 ? this.props.exceldata.splice(index,1) : this.props.exceldata.push(this.props.tablerow);
  }

  activateCheckbox1(primaryid) {
      this.state.checkbox ? this.setState({checkbox: false}) : this.setState({checkbox: true});
      this.checkIfActiveCheckbox(this.props.rowid) ? this.props.exceldata.splice(this.props.exceldata.indexOf(this.props.rowid),1) : this.props.exceldata.push(this.props.rowid); 
  }

  activateRow() {
    if (this.props.resulttype === "table-detail") {
        return (
            this.props.activerow === this.primaryid ? "active" : ""
        );
    } else {
        return "";
    }
}

activateTd() {
    if (this.props.resulttype === "table-detail") {
        return (
            "hover-td" + (this.props.activerow === this.primaryid ? " active" : "")
        );
    } else {
        return "hover-td";
    }
}

  getTableRows() {
    return Object.entries(this.props.tablerow).map((name, index) => {
        if (name[0] === this.props.primaryid) {
           this.primaryid = name[1];
        }
        if (this.props.exclude.indexOf(name[0]) === -1){
            if (index === 0) {
                return (
                    <td key={index} onClick={event => {this.rowClick(this.primaryid)}} className="first-td">{name[1]}</td>
                );
            }
                return (
                    <td key={index} onClick={event => {this.rowClick(this.primaryid)}}>{name[1]}</td>
                );
        }
    }); 
  }

  rowClick(id){
    this.props.showDetails(id);
  }

  render() {
    return (
      <tr className={this.activateRow()}
        key={this.props.index}>
          <td className="checkbox-td" onClick={event => {this.activateCheckbox(this.props.rowid)}}>
                <i className={"fa fa-" + ((this.checkIfActiveCheckbox(this.props.rowid)) ? "check-square" : "square") + "-o excel-checkbox" + ((this.checkIfActiveCheckbox(this.props.rowid)) ? " active" : "")} 
                aria-hidden="true"></i>
          </td>
          <td className={this.activateTd()}></td>
          {this.getTableRows()}
      </tr>
    );
  }
}

export default TableRow;
