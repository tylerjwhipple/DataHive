import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/getSearchPatient';

class SearchPatient extends Component {

    getSearchPatientList() {
        return this.props.data.getSearchPatientView.nodes.map((patient) => {
          return (
            <tr key={patient.patientId}>
              <td>{patient.patFirstName + ' ' + patient.patLastName}</td>
              <td>{patient.mrn}</td>
              <td>{patient.ssn}</td>
           </tr>
          );
        });  
    }
  
    render() {
        const { data: { loading, error } } = this.props;
        if (loading) {
            return <p>Loading...</p>;
        } else if (error) {
            return <p>Error!</p>;
        } else {
            return (
                <div>
                    <h3>Search Patient</h3>
                    <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>MRN</th>
                    <th>SSN</th>
                </tr>
                </thead>
                <tbody>
                {this.getSearchPatientList()}
                </tbody>
            </table>
                </div>
            );
        }
    }
}

export default graphql(query, {
    options: { variables: {
        "getFirstName": "B"
      } }
   })(SearchPatient);
