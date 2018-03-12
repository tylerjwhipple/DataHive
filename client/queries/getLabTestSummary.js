import gql from 'graphql-tag';

export default gql`
query getallLabTestSummaryViews($LabTestSummaryViewCondition: LabTestSummaryViewCondition) {
    allLabTestSummaryViews(condition: $LabTestSummaryViewCondition, orderBy: ORDER_DATE_DESC) {
      nodes {
        diagnosis
        ageTimeCollection
        ichartOrderNum
        lisOrderNumber
        uiOrderDate
        doctor
        orderingClinician
        location
        clinicalId
      }
    }
  }
`;