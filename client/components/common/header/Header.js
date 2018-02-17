import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

import HeaderDropdown from './HeaderDropdown';
import HeaderDropdownLink from './HeaderDropdownLink';

class Header extends React.Component {

  render() {
    return (
      <div className="main-header">
        <div className="logo">
        <img src={require('../../../imgs/datahive-logo.svg')}  alt="Datahive Logo" width="145"/>
        </div>
        <div className="company-name">
          <i className="fa fa-hospital-o icon-right" aria-hidden="true"></i>
          <span>St.Select Healthcare - Labratory</span>
        </div>

          <HeaderDropdown status="" selected="Caroline S.">
            <HeaderDropdownLink linkto="/account" icon="address-card" text="Account" />
            <HeaderDropdownLink linkto="/settings" icon="cog" text="Settings" />
            <div className="item">
              <i className="fa fa-sign-out icon-right" aria-hidden="true"></i>
              <span className="text">Log Out</span>
            </div>
          </HeaderDropdown>

          <HeaderDropdown status="active" selected="Patient Search">
            <HeaderDropdownLink linkto="/patient-search" icon="search" text="Patient Search" />
            <HeaderDropdownLink linkto="/material-search" icon="search" text="Material Search" />
            <HeaderDropdownLink linkto="/audit-log" icon="search" text="Audit Log" />
          </HeaderDropdown>

      </div>
    );
  }
}

/*
const Header = () => {
  return(



  );
};

*/

export default Header;
