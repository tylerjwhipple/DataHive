import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/PatientList';

class PatientList extends Component {

    getPatientList() {
      return this.props.data.allDemographics.nodes.map((patient) => {
        return (
          <tr key={patient.patientId}>
            <td>{patient.firstName + ' ' + patient.lastName}</td>
            <td>{patient.address + ' ' + patient.city + ', ' + patient.state + ' ' + patient.zip}</td>
         </tr>
        );
      });
            
    }

    render() {
      if (this.props.data.loading) { return <div>Loading...</div>; }

      return (
        <div>
            <h3>PatientList</h3>
            <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {this.getPatientList()}
        </tbody>
      </table>
        </div>
      );
  }
}


export default graphql(query)(PatientList);
