import gql from 'graphql-tag';

export default gql`
query getClinicalInfo($ClinicalInfoViewCondition: ClinicalInfoViewCondition, $offset: Int) {
  allClinicalInfoViews(condition: $ClinicalInfoViewCondition, first: 20, offset: $offset, orderBy: CLINICAL_DATE_DESC) {
    totalCount
    nodes {
      uiClinicalDate
      code
      description
      doctor
      patientId
      clinicalId
    }
  }
} 
`;