import React from 'react';
const Json2csvParser = require('json2csv').Parser;
const Json2csvTransform = require('json2csv').Transform;
import {CSVLink} from 'react-csv';

import Pagination from './Pagination';
import Button from '../../elements/Button';

class FooterContainer extends React.Component {

  endOfPaginationRange() {
    let offsetrange = this.props.currentoffset + 20;
    if(offsetrange >= this.props.totalcount) {
      return this.props.totalcount
    } else {
      return offsetrange
    }
  }

  displayPaginationRange() {
    let startpagerange = this.props.currentoffset + 1;
    let endpagerange = this.endOfPaginationRange();
    if (startpagerange === endpagerange) {
      return startpagerange;
    } else {
      return startpagerange + " - " + endpagerange;
    }
  }

  getExcelHeader1() {
    let fields = [];
    Object.entries(this.props.exceldata[0]).filter(name => {
      if (this.props.excludelist.indexOf(name[0]) === -1){
        return name
      }
    }).map(name => {return fields.push(name[0]);}); 
    return fields;
  }

  getExcelHeader() {
    let fields = [];
    Object.entries(this.props.exceldata[0]).map(name => {return fields.push(name[0]);}); 
    return fields;
  }

  generateExcel1() {
    if (Object.keys(this.props.exceldata).length != 0) {
      const fields = this.getExcelHeader1();
      const myCars = this.props.exceldata;    
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(myCars);
      console.log(csv);
    }
  }

  testExcel() {
    let headers = [
      {label: 'First Name', key: 'firstname'},
      {label: 'Last Name', key: 'lastname'}
    ];
     
    let data = [
      {firstname: 'Ahmed', lastname: 'Tomi' , email: 'ah@smthing.co.com'},
      {firstname:'Raed', lastname:'Labes' , email:'rl@smthing.co.com'} ,
      {firstname:'Yezzi', lastname:'Min l3b', email:'ymin@cocococo.com'}
    ];
     return (
      <CSVLink data={data} headers={headers} filename={"my-file.csv"}>
        <Button text="Export To Excel" icon="file-excel-o" type="excel" />
  </CSVLink>
     );
  }

  render() {
    return (
      <div className="main-footer">
        {this.testExcel()}
        <Pagination currentoffset={this.props.currentoffset} totalcount={this.props.totalcount} getData = {event => this.props.getData()}                 
          handleOffset={event => this.props.handleOffset(event)}
        />

        <div className="results-numbers">{this.displayPaginationRange()} of {this.props.totalcount} results</div>
      </div>
    );
  }
}

export default FooterContainer;
