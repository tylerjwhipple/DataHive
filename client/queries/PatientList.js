import gql from 'graphql-tag';

export default gql`
{
    allDemographics {
        nodes{
            patientId
            firstName
            lastName
            address
            state
            city
            zip
        }
    }
}
`;