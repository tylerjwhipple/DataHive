import gql from 'graphql-tag';

export default gql`
query getVisits($VisitsViewCondition: VisitsViewCondition) {
    allVisitsViews(condition: $VisitsViewCondition, orderBy: VISIT_DATE_DESC) {
      nodes {
        patientId
        uiVisitDate
        department
        location
        chiefComplaint
        visitDesc
        doctor
      }
    }
  } 
`;