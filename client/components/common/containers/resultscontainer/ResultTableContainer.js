import React from 'react';
import { transformHeaderValue } from '../../CommonFunctions';

import TableRow from './TableRow';

class ResultTableContainer extends React.Component {

    getTableClass() {
        if (this.props.resulttype === "table-detail") {
            return (
                "ui celled table" + (this.props.show ? " active" : "")
            );
        } else {
            return "ui celled table";
        }
    }

    getHeaderRow() {
        if (Object.keys(this.props.result).length != 0) {
            return Object.entries(this.props.result[0]).map((name, index) => {
                if (this.props.excludelist.indexOf(name[0]) === -1){
                    if (index === 0) {
                        return (
                            <th key={index} className="first-th">{transformHeaderValue(name[0])}</th>
                        );
                    }
                        return (
                            <th key={index}>{transformHeaderValue(name[0])}</th>
                        );
                }
            }); 
        }
    }

    getSearchResultList() {
    if (Object.keys(this.props.result).length === 0) {
        return <tr><td>No results</td></tr>
    } else {
    return this.props.result.map((row, index) => {
        return (
        <TableRow key={index} index={index} primarykey={this.props.primarykey} 
                activerow={this.props.activerow} resulttype={this.props.resulttype}    
                showDetails={event => this.props.showDetails(event)} tablerow={row} rowid={row[this.props.primarykey]}
                exceldata={this.props.exceldata} exclude={this.props.excludelist} />
        );
    }); 
    }
    }

  render() {
    return (
        <div className="result-table-container">
        <table className={this.getTableClass()}>
          <thead>
              <tr>
                  <th className="checkbox-td">
                    <span><i className="fa fa-square-o excel-checkbox" aria-hidden="true"></i></span>
                  </th>
                  <th className="hover-th"></th>
                  {this.getHeaderRow()}
                  <th className="detail-indicator-th"></th>
              </tr>
          </thead>
          <tbody className="search-body-list">
          {this.getSearchResultList()}
          </tbody>
      </table>
      </div>
    );
  }
}

export default ResultTableContainer;
