import React from 'react';
import { graphql } from 'react-apollo';
import { withApollo } from 'react-apollo/lib/graphql';

import SearchContainer from '../common/containers/searchcontainer/SearchContainer';
import ResultsContainer from '../common/containers/resultscontainer/ResultsContainer';
import FooterContainer from '../common/containers/footercontainer/FooterContainer';
import SearchInput from '../common/containers/searchcontainer/SearchInput';
import InputSelect from '../common/elements/InputSelect';
import Button from '../common/elements/Button';

import query from '../../queries/getSearchPatient';
import GET_PATIENT_DROPDOWN from '../../queries/getPatientDropdown';
import GET_VISITS from '../../queries/getVisits';

const searchlist = [
  {label:'First Name', value: 'firstname'},
  {label: 'Last Name', value: 'lastname'},
  {label: 'SSN', value: 'ssn'},
  {label: 'MRN', value: 'mrn'},
  {label: 'DOB', value: 'dob'}
];

const tablerows = [
  {id: 123456, firstname: "John", lastname: "Smith", gender: "Male"},
  {id: 123457, firstname: "Elizabeth", lastname: "Samsonite", gender: "Female"},
  {id: 123458, firstname: "Conner", lastname: "Whipple", gender: "Male"}
];

const sectionlist = [
  {optionvalue: "Visit", optionlabel: "Visit"}, 
  {optionvalue: "Clinical Information", optionlabel: "Clinical Information"}, 
  {optionvalue: "Patient Summary", optionlabel: "Patient Summary"}
];

class PatientSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientid: null,
      firstname: '',
      lastname: '',
      mrn: null,
      ssn: null,
      selectedoption: null,
      selectedsection: '',
      patientdropdown: [],
      result: []
    };
  }

  handleChange(update, key) {
    this.setState({
      [key]: update
  });
  }

  async getPatientList() {
      const { patientid, firstname, lastname, mrn, ssn } = this.state;
      const result = await this.props.client.query({
        query: GET_PATIENT_DROPDOWN,
        variables: { 
          "getPatientid" : patientid,
          "getFirstName" : firstname,
          "getLastName" : lastname,
          "getMrn" : mrn,
          "getSsn" : ssn
      }
      });
      const patientlist = result.data.getSearchPatientView.nodes;
      this.setState({ patientdropdown: patientlist });
  }

  async getVisits() {
    const { selectedoption } = this.state;
    const result = await this.props.client.query({
      query: GET_VISITS,
      variables: {
        "VisitsViewCondition": {
          "patientId": selectedoption
        }
      },
    });
    const visits = result.data.allVisitsViews.nodes;
    this.setState({ result: visits });
  }

  render() {
    console.log(this.state.selectedsection);
    return (
      <div>
        <div className="search-container">
          <form>
            <SearchInput label="Patient Id" value="patientid" searchChange={term => this.handleChange(term, "patientid")} />
            <SearchInput label="First Name" value="firstname" searchChange={term => this.handleChange(term, "firstname")} />
            <SearchInput label="Last Name" value="lastname" searchChange={term => this.handleChange(term, "lastname")} />
            <SearchInput label="SSN" value="ssn" searchChange={term => this.handleChange(term, "ssn")} />
            <SearchInput label="MRN" value="mrn" searchChange={term => this.handleChange(term, "mrn")} />
            <div className="container-col">
              <span className="input-label"></span>
              <Button text="Search" icon="search" type="search" buttonclick={() => this.getPatientList()}/>
            </div>
          </form>
        </div>
        <div className="search-container-bottom">
          <div className="container-col">
            <span className="input-label">Patient Search</span>
            <InputSelect
              options={this.state.patientdropdown} 
              selectedoption={option => this.handleChange(option, "selectedoption")}
              defaultoption={"Select Patient..."}
            />
            <InputSelect 
              options={sectionlist} 
              selectedoption={option => this.handleChange(option, "selectedsection")}
              defaultoption={"Select Section..."}
            />
          </div>
          <div className="container-col">
          <span className="input-label"></span>
          <Button text="Search" icon="search" type="search" buttonclick={() => this.getVisits()}/>
          </div>
        </div>
        <ResultsContainer tablerows={tablerows} result={this.state.result}/>
        <FooterContainer />
        
      </div>
    );
  }
}

export default withApollo(PatientSearchPage);

/*
export default graphql(query, {
  options: { variables: {
      "getFirstName": "B"
    } }
 })(PatientSearchPage);

 */
