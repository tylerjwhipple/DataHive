import gql from 'graphql-tag';

export default gql`
query allMedicationsView($MedicationViewCondition: MedicationViewCondition) {
  allMedicationViews(condition: $MedicationViewCondition, orderBy: MED_DATE_DESC) {
    nodes {
			clinicalId
      medicationDate
      description
      quantity
      duration
      refills
      type
      doctor
    }
  }
}
`;