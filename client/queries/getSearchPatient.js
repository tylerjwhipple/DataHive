import gql from 'graphql-tag';

export default gql`
query getSearchPatientView($getPatientid: Int, $getFirstName: String, $getLastName: String, $getMrn: Int, $getSsn: Int) {
    getSearchPatientView(getPatientid: $getPatientid, getFirstname: $getFirstName, getLastname: $getLastName, getMrn: $getMrn, getSsn: $getSsn) {
      nodes {
        patientId
        patFirstName
        patLastName
        mrn
        ssn
      }
    }
  }  
`;