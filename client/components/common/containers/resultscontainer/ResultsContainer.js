import React from 'react';

import TableRow from './TableRow';
import DetailsContainer from '../detailscontainer/DetailsContainer';

import Button from '../../../common/elements/Button';

class ResultsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.showDetails = this.showDetails.bind(this)
    this.hideDetails = this.hideDetails.bind(this)
    this.state = {
      show: false
    }
  }

  showDetails() {
      if (this.state.show === true) {
        this.setState({
            show: false
        });
      } else {
        this.setState({
            show: true
        });
      }
  }

  hideDetails() {
      this.setState({
          show: false
      });
  }

  getHeaderRow() {
    return this.props.header.map((name, index) => {
        if (index === 0) {
            return (
                <th key={index} className="first-th">{name}</th>
            );
        }
            return (
                <th key={index}>{name}</th>
            );
    }); 
  }

  getSearchResultList() {
    if (Object.keys(this.props.result).length === 0) {
        return <tr><td>No results</td></tr>
    } else {
    return this.props.result.map((row, index) => {
      return (
        <TableRow key={index} primaryid={index} showdetail={this.showDetails} tablerow={row} exclude={this.props.excludelist} />
      );
    }); 
    }
  }

  render() {
    return (
      <div className="result-container">
      <div className="table-container">
            <table className={"ui celled table" + (this.state.show ? " active" : "")}>
          <thead>
              <tr>
                  <th className="checkbox-td">
                      <input type="checkbox" name="vehicle" value="All" />
                  </th>
                  <th className="hover-th"></th>
                  {this.getHeaderRow()}
              </tr>
          </thead>
          <tbody className="search-body-list">
          {this.getSearchResultList()}
          </tbody>
      </table>
      </div>

      <DetailsContainer showdetail={this.hideDetails} show={this.state.show} />
      </div>
    );
  }
}

export default ResultsContainer;
