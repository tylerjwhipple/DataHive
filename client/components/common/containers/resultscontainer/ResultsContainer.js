import React from 'react';

import TableRow from './TableRow';
import ResultTableContainer from './ResultTableContainer';
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

  render() {
    return (
      <div className="result-container">
    <ResultTableContainer  header={this.props.header} excludelist={this.props.excludelist} result={this.props.result} show={this.state.show} showDetails={this.showDetails} />
      <DetailsContainer showdetail={this.hideDetails} show={this.state.show} />
      </div>
    );
  }
}

export default ResultsContainer;
