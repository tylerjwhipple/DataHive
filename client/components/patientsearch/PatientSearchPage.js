import React from 'react';
import { graphql } from 'react-apollo';
import { withApollo } from 'react-apollo/lib/graphql';

import SearchContainer from '../common/containers/searchcontainer/SearchContainer';
import ResultsContainer from '../common/containers/resultscontainer/ResultsContainer';
import ResultTableContainer from '../common/containers/resultscontainer/ResultTableContainer';
import DetailsContainer from '../common/containers/detailscontainer/DetailsContainer';
import DetailsTableContainers from '../common/containers/detailscontainer/DetailsTableContainers';
import FooterContainer from '../common/containers/footercontainer/FooterContainer';
import SearchInput from '../common/containers/searchcontainer/SearchInput';
import SearchInputRef from '../common/containers/searchcontainer/SearchInputRef';
import InputSelect from '../common/elements/InputSelect';
import Button from '../common/elements/Button';

import query from '../../queries/getSearchPatient';
import GET_PATIENT_DROPDOWN from '../../queries/getPatientDropdown';
import GET_VISITS from '../../queries/getVisits';
import GET_CLINICAL_INFO from '../../queries/getClinicalInfo';
import GET_MEDICATIONS from '../../queries/getMedication';
import GET_LAB_TEST_TABLE from '../../queries/getLabTestTable';
import GET_LAB_TEST_SUMMARY from '../../queries/getLabTestSummary';

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

const excludelist = ['patientId', 'clinicalId', 'visitsId', '__typename'];

let currentactive = {
  selectedoption: '',
  selectedsection: '',
  offset: 0
}

const visitvariables = {
  "VisitsViewCondition": {
    "patientId": currentactive.selectedoption
  }
}

const clinicalinfovariables = {
  "ClinicalInfoViewCondition": {
    "patientId": currentactive.selectedoption
  }
}

class PatientSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
    this.state = {
      showdetails: false,
      patientid: null,
      firstname: '',
      lastname: '',
      mrn: null,
      ssn: null,
      isSearchClicked: false,
      patientdropdown: [],
      result: [],
      exceldata: [],
      totalcount: null,
      activerow: null,
      offset: null,
      medications: [],
      labtesttable: [],
      labtestsummary: []
    };
    this.detaildata = [
      {labtesttable : []}
    ];
    this.exceldata = [] 
  }

  handleChange(update, key) {
    this.setState({
      [key]: update
  });
  }

  changeCurrentActive(update, key) {
    currentactive[key] = update;
  }

  showDetails(activerow) {
    if (this.state.showdetails === true && this.state.activerow === activerow) {
      this.setState({
          showdetails: false,
          activerow: null
      });
    } else {
      this.setState({
          showdetails: true,
          activerow: activerow
      });
      this.getDetails(activerow);
    }
  }

  hideDetails() {
      this.setState({
          showdetails: false
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
      this.setState({ patientdropdown: patientlist, isSearchClicked: true });
  }

  async getVisits() {
    const result = await this.props.client.query({
      query: GET_VISITS,
      variables: {
        "VisitsViewCondition": {
          "patientId": currentactive.selectedoption
        },
        "offset" : currentactive.offset
      },
    });
    const visits = result.data.allVisitsViews.nodes;
    this.setState({ result: visits, totalcount: result.data.allVisitsViews.totalCount});
  }

  async getClinicalInfo() {
    const result = await this.props.client.query({
      query: GET_CLINICAL_INFO,
      variables: {
          "ClinicalInfoViewCondition": {
            "patientId": currentactive.selectedoption
          },
          "offset" : currentactive.offset
      },
    });
    const results = result.data["allClinicalInfoViews"].nodes;
    this.setState({ result: results, totalcount: result.data.allClinicalInfoViews.totalCount});
  }

  async getMedication(activerow) {
    const result = await this.props.client.query({
      query: GET_MEDICATIONS,
      variables: {
          "MedicationViewCondition": {
            "clinicalId": activerow
          }
      },
    });
    this.setState({ medications: result.data.allMedicationViews.nodes});
  }

  async getLabTestTable(activerow) {
    const result = await this.props.client.query({
      query: GET_LAB_TEST_TABLE,
      variables: {
          "LabTestTableCondition": {
            "clinicalId": activerow
          }
      },
    });
    this.setState({ labtesttable: result.data.allLabTestTables.nodes});
  }

  async getLabTestSummary(activerow) {
    const result = await this.props.client.query({
      query: GET_LAB_TEST_SUMMARY,
      variables: {
          "LabTestSummaryViewCondition": {
            "clinicalId": activerow
          }
      },
    });
    this.setState({ labtestsummary: result.data.allLabTestSummaryViews.nodes});
  }

  async getResults(GET_QUERY, variableslist, resultview) {
    const result = await this.props.client.query({
      query: GET_QUERY,
      variables: {variableslist}
    });
    const results = result.data[resultview].nodes;
    this.setState({ result: results});
  }

  getData(querytype) {
  if(querytype === "new-query") {
    currentactive.offset = 0;
    this.exceldata = [];
  }
    this.setState({ activerow: null});
    if (currentactive.selectedsection === "Visit") {
      this.getVisits()
      //this.getResults(GET_VISITS, visitvariables, "allVisitsViews")
    } else if (currentactive.selectedsection === "Clinical Information") {
      this.getClinicalInfo() 
      //this.getResults(GET_CLINICAL_INFO, clinicalinfovariables, "allClinicalInfoViews")
    }
  }

  getDetails(activerow) {
    this.getMedication(activerow);
    this.getLabTestTable(activerow);
    this.getLabTestSummary(activerow);
  }

  displayResults() {
    if (Object.keys(this.state.result).length === 0) {
      return <div>No Results</div> 
    } else {
      if (currentactive.selectedsection === "Visit") {
        return (
          <div>
            <div className="result-container">
              <ResultTableContainer
                  resulttype="table-only"
                  primarykey="visitsId"  
                  excludelist={excludelist} 
                  result={this.state.result}
                  exceldata={this.exceldata} 
                  show={this.state.showdetails} 
                  showDetails={this.showDetails} />
            </div>
            <FooterContainer
                totalcount={this.state.totalcount}
                currentoffset={currentactive.offset}
                handleOffset={event => this.changeCurrentActive(event, "offset")}
                getData = {event => this.getData("pagination")}
                excludelist={excludelist}  
                exceldata = {this.exceldata}   
            />
          </div>
        );
      } else if (currentactive.selectedsection === "Clinical Information") {
        return (
          <div>
            <div className="result-container">
              <ResultTableContainer
                  resulttype="table-detail"
                  primarykey="clinicalId"  
                  excludelist={excludelist} 
                  result={this.state.result}
                  exceldata={this.exceldata}  
                  show={this.state.showdetails}
                  activerow={this.state.activerow}
                  showDetails={event => this.showDetails(event)} />
              <DetailsContainer showdetail={this.hideDetails} show={this.state.showdetails}>
                <DetailsTableContainers detailtype="standard-table" hd="Medications" result={this.state.medications} exclude={excludelist} />
                <DetailsTableContainers detailtype="one-col-table" hd="Lab Test Summary" result={this.state.labtestsummary} exclude={excludelist} />
                <DetailsTableContainers detailtype="standard-table" hd="Lab Test Table" result={this.state.labtesttable} exclude={excludelist} />
              </DetailsContainer>
            </div>
              <FooterContainer 
                      totalcount = {this.state.totalcount}
                      currentoffset = {currentactive.offset}
                      handleOffset = {event => this.changeCurrentActive(event, "offset")}
                      getData = {event => this.getData("pagination")}
                      exceldata = {this.exceldata}   
                />
          </div>
        );
        }
    };
  }
    
  render() {
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
              selectedoption={option => this.changeCurrentActive(option, "selectedoption")}
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
          <Button text="Get Results" icon="bars" type="search" buttonclick={() => this.getData("new-query")}/>
          </div>
        </div>
        {this.displayResults()}
      </div>
    );
  }
}

export default withApollo(PatientSearchPage);

