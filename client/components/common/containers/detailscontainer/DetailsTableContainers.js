import React from 'react';
import { transformHeaderValue } from '../../CommonFunctions';

class DetailsTableContainers extends React.Component {

    getTableHeaderRow() {
        if (Object.keys(this.props.result).length != 0) {
            return Object.entries(this.props.result[0]).map((name, index) => {
                if (this.props.exclude.indexOf(name[0]) === -1){
                        return (
                            <th key={index}>{transformHeaderValue(name[0])}</th>
                        );
                }
            }); 
        }
    }

    getTableRow() {
        if (Object.keys(this.props.result).length === 0) {
            return <tr><td>No results</td></tr>
        } else {
            return this.props.result.map((row, index) => {
                return (
                    <tr key={index}>{this.getTableTd(row)}</tr>
                );
            }); 
        }
    }

    getTableTd(row) {
        return Object.entries(row).map((name, index) => {
            if (this.props.exclude.indexOf(name[0]) === -1){
                    return (
                        <td key={index}>{name[1]}</td>
                    );
            }
        }); 
      }

      getOneColTable() {
        if (Object.keys(this.props.result).length === 0) {
            return <tr><td>No results</td></tr>
        } else {
            return Object.entries(this.props.result[0]).map((name, index) => {
                if (this.props.exclude.indexOf(name[0]) === -1){
                        return (
                            <tr key={index}>
                                <td className="label-td">{transformHeaderValue(name[0])}</td>
                                <td>{name[1]}</td>
                            </tr>
                        );
                }
            }); 
        }
        }

      showTable() {
          if (this.props.detailtype === "standard-table") {
              return(
                <table className="details-standard-table">
                    <thead>
                        <tr>{this.getTableHeaderRow()}</tr>
                    </thead>
                    <tbody>{this.getTableRow()}</tbody>
                </table>
              )
          }
          if (this.props.detailtype === "one-col-table") {
            return(
                    <table className="details-standard-table details-col-table">
                    <tbody>
                        {this.getOneColTable()}
                    </tbody>
                </table>
            )
        }
      }

  render() {
    return (
        <div className="details-table-container">
            <div className="details-table-container-hd">{this.props.hd}</div>
            {this.showTable()}
          </div>
    );
  }
}

export default DetailsTableContainers;
