import gql from 'graphql-tag';

export default gql`
query getallLabTestTables($LabTestTableCondition: LabTestTableCondition) {
    allLabTestTables(condition: $LabTestTableCondition, orderBy: TEST_ASC) {
      nodes {
        clinicalId
        test
        result
        units
        refRange
      }
    }
  }  
`;