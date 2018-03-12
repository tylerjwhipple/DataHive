import gql from 'graphql-tag';

export default gql`
query getVisits($VisitsViewCondition: VisitsViewCondition, $offset: Int) {
  allVisitsViews(condition: $VisitsViewCondition, first: 20, offset: $offset, orderBy: VISIT_DATE_DESC) {
    totalCount
    nodes {
      uiVisitDate
      department
      location
      chiefComplaint
      visitDesc
      doctor
      patientId
      visitsId
    }
  }
}
`;