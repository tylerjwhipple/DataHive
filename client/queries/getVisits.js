import gql from 'graphql-tag';

export default gql`
query getVisits($VisitsViewCondition: VisitsViewCondition) {
    allVisitsViews(condition: $VisitsViewCondition) {
      nodes {
        patientId
        visitDate
        department
        location
        chiefComplaint
        visitDesc
        doctor
      }
    }
  } 
`;