import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient, { createNetworkInterface }  from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import PatientList from './components/PatientList';
import SearchPatient from './components/SearchPatient';

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
            </Route>
          </Router>
        </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));