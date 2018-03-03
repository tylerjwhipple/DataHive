import React from 'react';
import { graphql } from 'react-apollo';
import { withApollo } from 'react-apollo/lib/graphql';

import SearchContainer from '../common/containers/searchcontainer/SearchContainer';
import ResultsContainer from '../common/containers/resultscontainer/ResultsContainer';
import FooterContainer from '../common/containers/footercontainer/FooterContainer';
import SearchInput from '../common/containers/searchcontainer/SearchInput';
import SearchInputRef from '../common/containers/searchcontainer/SearchInputRef';
import InputSelect from '../common/elements/InputSelect';
import Button from '../common/elements/Button';

import query from '../../queries/getSearchPatient';
import GET_PATIENT_DROPDOWN from '../../queries/getPatientDropdown';
import GET_VISITS from '../../queries/getVisits';
import GET_CLINICAL_INFO from '../../queries/getClinicalInfo';

const searchlist = [
  {label:'First Name', value: 'firstname'},
  {label: 'Last Name', value: 'lastname'},
  {label: 'SSN', value: 'ssn'},
  {label: 'MRN', value: 'mrn'},
  {label: 'DOB', value: 'dob'}
];

const sectionlist = [
  {optionvalue: "Visit", optionlabel: "Visit", type: "table-only"}, 
  {optionvalue: "Clinical Information", optionlabel: "Clinical Information", type: "table-detail"}, 
  {optionvalue: "Patient Summary", optionlabel: "Patient Summary", type: "detail-only"}
];

const excludelist = ['patientId', '__typename'];

let currentactive = {
  selectedoption: '',
  selectedsection: ''
}

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
      isSearchClicked: false,
      patientdropdown: [],
      result: []
    };
  }

  handleChange(update, key) {
    this.setState({
      [key]: update
  });
  }

  changeCurrentActive(update, key) {
    currentactive[key] = update;
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
      this.setState({ patientdropdown: patientlist, isSearchClicked: true });
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
    this.setState({ result: visits});
  }

  async getClinicalInfo() {
    const { selectedoption } = this.state;
    const result = await this.props.client.query({
      query: GET_CLINICAL_INFO,
      variables: {
          "ClinicalInfoViewCondition": {
            "patientId": selectedoption
          }
      },
    });
    const visits = result.data.allClinicalInfoViews.nodes;
    this.setState({ result: visits});
  }

  getResults() {
    if (Object.keys(this.state.result).length === 0) {
      return <div>No Results</div> 
    } else {
      if (currentactive.selectedsection === "Visit") {
        const header = ['Visit Date', 'Department', 'Location', 'Chief Complaint', 'Visit Description', 'Doctor'];
        return (
          <div>       
            <ResultsContainer header={header} excludelist={excludelist} result={this.state.result}/>
            <FooterContainer />
          </div>
        );
      } else if (currentactive.selectedsection === "Clinical Information") {
        const header = ['Clinical Date', 'Code', 'Description', 'Doctor'];
        return (
          <div> 
            <ResultsContainer header={header} excludelist={excludelist} result={this.state.result}/>
            <FooterContainer />
          </div>
        );
        }
        else {
          return (
            <div>Other</div>
          )
        }
    };
  }

  getData() {
      if (currentactive.selectedsection === "Visit") {
        this.getVisits();
      } else if (currentactive.selectedsection === "Clinical Information") {
        this.getClinicalInfo()
        }
        else {
    }
  }
    
  render() {
    {console.log(currentactive.selectedsection);}
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
              <Button text="Search Patients" icon="search" type="search" buttonclick={() => this.getPatientList()}/>
            </div>
          </form>
        </div>
        <div className="search-container-bottom">
          <div className="container-col">
            <span className="input-label">Select Patient</span>
            <InputSelect
              options={this.state.patientdropdown} 
              selectedoption={option => this.handleChange(option, "selectedoption")}
              defaultoption={"Select Patient..."}
            />
            <span className="input-label">Select Section</span>
            <InputSelect 
              options={sectionlist} 
              selectedoption={option => this.changeCurrentActive(option, "selectedsection")}
              defaultoption={"Select Section..."}
            />
          </div>
          <div className="container-col">
          <span className="input-label"></span>
          <Button text="Get Results" icon="search" type="search" buttonclick={() => this.getData()}/>
          </div>
        </div>
        {this.getResults()}
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
