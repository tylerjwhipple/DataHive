import React from 'react';
const Json2csvParser = require('json2csv').Parser;
const Json2csvTransform = require('json2csv').Transform;
import {CSVLink} from 'react-csv';
import { transformHeaderValue } from '../../CommonFunctions';

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

  createHeaderObject() {
    let header = [];
    Object.entries(this.props.exceldata[0]).filter(name => {
      if (this.props.excludelist.indexOf(name[0]) === -1){
        return name
      }
    }).map(name => {
      var headeritem = new Object();
      headeritem.label = transformHeaderValue(name[0]);
      headeritem.value = name[0];
      return header.push(headeritem);
    }); 
    console.log(header);
    return header;
  }

  generateExcel1() {
    if (Object.keys(this.props.exceldata).length != 0) {
      const fields = this.createHeaderObject();
      const exceldata = this.props.exceldata;    
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(exceldata, { fields });
    }
  }

  buildURI(uFEFF, generateExcel) {
    console.log(generateExcel);
    var csv = '"Visit Date";"Department";"Location";"Chief Complaint";"Visit Desc";"Doctor" \r\n "05/05/2012";"Gastroenterology";"Habitasse laoreet conubia.";"Cubilia tellus placerat cursus mauris habitant.";"Aliquet nisl dis convallis.";"Rosa, Aiyana"';
    var blob = new Blob([uFEFF ? '\uFEFF' : '', csv], { type: 'text/csv' });
    var dataURI = 'data:text/csv;charset=utf-8,' + (uFEFF ? '\uFEFF' : '') + csv;
  
    var URL = window.URL || window.webkitURL;
  
    return typeof URL.createObjectURL === 'undefined' ? dataURI : URL.createObjectURL(blob);
  };

  testURI() {
    const rows = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
let csvContent = "data:text/csv;charset=utf-8,";
rows.forEach(function(rowArray){
   let row = rowArray.join(",");
   csvContent += row + "\r\n";
}); 
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
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

  testThis(generateExcel) {
    let csvlink = this.buildURI(true, generateExcel);
    window.location.assign(csvlink);
  }

  render() {
    return (
      <div className="main-footer">
        {this.testExcel()}
        <Button text="Export To Excel" icon="file-excel-o" type="excel" buttonclick={() => this.testThis(this.generateExcel1())} />
        <a download={"my-file.csv"}
         href={this.buildURI(true)}>
        Hey you guys
      </a>
        <Pagination currentoffset={this.props.currentoffset} totalcount={this.props.totalcount} getData = {event => this.props.getData()}                 
          handleOffset={event => this.props.handleOffset(event)}
        />

        <div className="results-numbers">{this.displayPaginationRange()} of {this.props.totalcount} results</div>
      </div>
    );
  }
}

export default FooterContainer;
