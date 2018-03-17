import React from 'react';
import { transformHeaderValue } from '../../CommonFunctions';

class DetailsTableContainer extends React.Component {

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

    getMultiColTd(filteredtablerowdata, count){
        let multitd = [];
        filteredtablerowdata.map((name) => {
            multitd.push(<td className="label-td">{transformHeaderValue(name[0])}</td>);
            multitd.push(<td>{name[1]}</td>);
        });
        if (filteredtablerowdata.length < count) {
            for (let i = 0; i < (count - filteredtablerowdata.length); i++) {
                multitd.push(<td className="label-td"></td>);
                multitd.push(<td></td>);
            }
        }
        return multitd;
    }

    getMultiColTable(count) {
        if (Object.keys(this.props.result).length === 0) {
            return <tr><td>No results</td></tr>
        } else {
            let filteredtable = Object.entries(this.props.result[0]).filter((name) => {
                if (this.props.exclude.indexOf(name[0]) === -1){
                    return name;
                }
            });
            let totaltdcount = Math.ceil(filteredtable.length/count) * count;
            let multitablerows = [];
            for (let i = 0; i < totaltdcount; i=i+count) {
              multitablerows.push(<tr key={i}>{this.getMultiColTd(filteredtable.splice(0,count), count)}</tr>)
            }
            return multitablerows;
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
            );
        }
        if (this.props.detailtype === "multi-col-table") {
            return(
                <table className="details-standard-table details-col-table">
                <tbody>
                {this.getMultiColTable(this.props.colcount)}
                </tbody>
            </table>
        );
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

export default DetailsTableContainer;
