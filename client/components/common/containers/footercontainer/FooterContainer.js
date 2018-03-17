import React from 'react';

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

  render() {
    return (
      <div className="main-footer">
        <Button text="Export To Excel" icon="file-excel-o" type="excel"/>
        <Pagination currentoffset={this.props.currentoffset} totalcount={this.props.totalcount} getData = {event => this.props.getData()}                 
          handleOffset={event => this.props.handleOffset(event)}
        />

        <div className="results-numbers">{this.displayPaginationRange()} of {this.props.totalcount} results</div>
      </div>
    );
  }
}

export default FooterContainer;
