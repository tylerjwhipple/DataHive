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
      this.setState({
          show: true
      });
  }

  hideDetails() {
      this.setState({
          show: false
      });
  }

  getSearchPatientList() {
    if (Object.keys(this.props.result).length === 0) {
        return <tr><td>No results</td></tr>
    } else {
    return this.props.result.map((visit) => {
      return (
        <tr key={visit.location}>
                <td className="checkbox-td">
                    <input type="checkbox" name={visit.patientId} value={visit.patientId} />
                </td>
                <td className="hover-td active"></td>
                <td className="first-td">{visit.visitDate}</td>
                <td>{visit.department}</td>
                <td>{visit.location}</td>
                <td>{visit.chiefComplaint}</td>
                <td>{visit.visitDesc}</td>
                <td>{visit.doctor}</td>
            </tr>
      );
    }); 
    }
  }

  render() {
    let tablerows = this.props.tablerows.map(row => {
      return <TableRow key={row.id} showdetail={this.showDetails} tablerow={row} />;
      /*
        <tr>
                <td className="checkbox-td">
                    <input type="checkbox" name={row.id} value={row.id} />
                </td>
                <td className="hover-td active"></td>
                <td className="first-td">{row.firstname}</td>
                <td>{row.lastname}</td>
                <td>{row.gender}</td>
            </tr>;
            */
    });

    return (
      <div className="result-container">
            <table className={"ui celled table" + (this.state.show ? " active" : "")}>
          <thead>
              <tr>
                  <th className="checkbox-td">
                      <input type="checkbox" name="vehicle" value="All" />
                  </th>
                  <th className="hover-th"></th>
                  <th className="first-th">Visit Date</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Chief Complaint</th>
                  <th>Visit Description</th>
                  <th>Doctor</th>
              </tr>
          </thead>
          <tbody className="search-body-list">
          {this.getSearchPatientList()}
          </tbody>
      </table>

      <DetailsContainer showdetail={this.hideDetails} show={this.state.show} />
      </div>
    );
  }
}

export default ResultsContainer;
