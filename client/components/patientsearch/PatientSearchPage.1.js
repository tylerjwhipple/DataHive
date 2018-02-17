import React from 'react';
import { graphql } from 'react-apollo';

import SearchContainer from '../common/containers/searchcontainer/SearchContainer';
import ResultsContainer from '../common/containers/resultscontainer/ResultsContainer';
import FooterContainer from '../common/containers/footercontainer/FooterContainer';
import SearchInput from '../common/containers/searchcontainer/SearchInput';
import InputDropdown from '../common/elements/InputDropdown';
import Button from '../common/elements/Button';

import query from '../../queries/getSearchPatient';
import { withApollo } from 'react-apollo/lib/graphql';

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

class PatientSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientid: '',
      firstname: '',
      lastname: '',
      mrn: '',
      ssn: ''
    };
  }

  handleChange(term, type) {
    if (type === "patientid") {
      this.setState({patientid: term});
    }
    if (type === "firstname") {
      this.setState({firstname: term});
    }
    if (type === "lastname") {
      this.setState({lastname: term});
    }
    if (type === "mrn") {
      this.setState({mrn: term});
    }
    if (type === "ssn") {
      this.setState({ssn: term});
    }
  }

  getSearchPatientList() {
    return this.props.data.getSearchPatientView.nodes.map((patient) => {
      return (
        <div key={patient.patientId}>
          <p>{patient.patFirstName + ' ' + patient.patLastName}</p>
          <p>{patient.mrn}</p>
          <p>{patient.ssn}</p>
       </div>
      );
    });  
}

  render() {
    const { data: { loading, error } } = this.props;
    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>Error!</p>;
    } else {
    return (
      <div>
        <div className="search-container">
          <form onSubmit={this.handleSubmit}>
            <SearchInput label="Patient Id" value="patientid" searchChange={term => this.handleChange(term, "patientid")} />
            <SearchInput label="First Name" value="firstname" searchChange={term => this.handleChange(term, "firstname")} />
            <SearchInput label="Last Name" value="lastname" searchChange={term => this.handleChange(term, "lastname")} />
            <SearchInput label="SSN" value="ssn" searchChange={term => this.handleChange(term, "ssn")} />
            <SearchInput label="MRN" value="mrn" searchChange={term => this.handleChange(term, "mrn")} />
            {/* 
            <SearchInput label="First Name" value="firstname"/>
            <SearchInput label="Last Name" value="lastname"/>
            <SearchInput label="MRN" value="mrn"/>
            <SearchInput label="SSN" value="ssn"/> */}
            <div className="container-col">
              <span className="input-label"></span>
              <Button text="Search" icon="search" type="search" buttonclick={this.clickSubmit}/>
            </div>
            {this.state.patientid}
            {this.state.firstname}
            {this.state.lastname}
            {this.state.ssn}
            {this.state.mrn}
          </form>
        </div>
        {/* <SearchContainer searchlist={searchlist} search={this.state.search} */}  
        <div className="search-container-bottom">
          <div className="container-col">
            <span className="input-label">Patient Search</span>
            <InputDropdown />
          </div>
          <div className="container-col">
          <span className="input-label"></span>
          <Button text="Search" icon="search" type="search"/>
          </div>
        </div>
        <ResultsContainer tablerows={tablerows}/>
        {this.getSearchPatientList()}
        <FooterContainer />
        
      </div>
    );
    }
  }
}


export default graphql(query, {
  options: { variables: {
      "getFirstName": "B"
    } }
 })(PatientSearchPage);

