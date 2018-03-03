import gql from 'graphql-tag';

export default gql`
query getClinicalInfo($ClinicalInfoViewCondition: ClinicalInfoViewCondition) {
  allClinicalInfoViews(condition: $ClinicalInfoViewCondition, orderBy: CLINICAL_DATE_DESC) {
    nodes {
      patientId
      uiClinicalDate
      clinicalId
      description
      doctor
    }
  }
} 
`;