import React from 'react';

import SearchContainer from '../common/containers/searchcontainer/SearchContainer';
import FooterContainer from '../common/containers/footercontainer/FooterContainer';

const searchlist = [
  {label: 'First Name', value: 'firstname'},
  {label: 'Last Name', value: 'lastname'},
  {label: 'Start Date', value: 'startdate'},
  {label: 'End Date', value: 'enddate'}
];

class AuditLogPage extends React.Component {

  render() {
    return (
      <div>
        <SearchContainer searchlist={searchlist} />
        <FooterContainer />
      </div>
    );
  }
}

export default AuditLogPage;
