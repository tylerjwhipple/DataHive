import React from 'react';

import SearchContainer from '../common/containers/searchcontainer/SearchContainer';
import FooterContainer from '../common/containers/footercontainer/FooterContainer';

const searchlist = [
  {label: 'First Name', value: 'firstname'},
  {label: 'Last Name', value: 'lastname'},
  {label: 'Material', value: 'material'},
  {label: 'DX Code', value: 'dxcode'}
];

class MaterialSearchPage extends React.Component {

  render() {
    return (
      <div>
        <SearchContainer searchlist={searchlist} />
        <FooterContainer />
      </div>
    );
  }
}

export default MaterialSearchPage;
