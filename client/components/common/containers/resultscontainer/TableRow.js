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

    checkIfActiveCheckbox(primaryid, primarykey) {
        return this.props.exceldata.findIndex(function(el) {return el[primarykey] === primaryid;}) !== -1;
    }

    getCheckboxIndex(primaryid, primarykey) {
        return this.props.exceldata.findIndex(function(el) {return el[primarykey] === primaryid;})
    }

    activateCheckbox(primaryid, primarykey) {
        this.state.checkbox ? this.setState({checkbox: false}) : this.setState({checkbox: true});
        let index = this.getCheckboxIndex(primaryid, primarykey);
        index !== -1 ? this.props.exceldata.splice(index,1) : this.props.exceldata.push(this.props.tablerow);
    }

    activateRow() {
        if (this.props.resulttype === "table-detail") {
            return (
                "tr-details" + (this.props.activerow === this.primaryid ? " active" : "")
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
        if (name[0] === this.props.primarykey) {
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
          <td className="checkbox-td" onClick={event => {this.activateCheckbox(this.props.rowid, this.props.primarykey)}}>
                <i className={"fa fa-" + ((this.checkIfActiveCheckbox(this.props.rowid, this.props.primarykey)) ? "check-square-o excel-checkbox active" : "square-o excel-checkbox")} 
                aria-hidden="true"></i>
          </td>
          <td className={this.activateTd()}></td>
          {this.getTableRows()}
      </tr>
    );
  }
}

export default TableRow;
