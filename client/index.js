import './styles/styles.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient, { createNetworkInterface }  from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import PatientList from './components/PatientList';
import SearchPatient from './components/SearchPatient';
import PatientSearchPage from './components/patientsearch/PatientSearchPage';
import MaterialSearchPage from './components/materialsearch/MaterialSearchPage';
import AuditLogPage from './components/auditlog/AuditLogPage';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});


const Root = () => {
  return (
        <ApolloProvider client={client}>
          <Router history={hashHistory}>
            <Route path="/" component={App}>
              <Route path="patient" component={PatientList} />
              <Route path="searchpatient" component={SearchPatient} />
              <Route path="patient-search" component={PatientSearchPage} />
              <Route path="material-search" component={MaterialSearchPage} />
              <Route path="audit-log" component={AuditLogPage} />
            </Route>
          </Router>
        </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));