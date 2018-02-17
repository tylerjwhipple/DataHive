import React from 'react';
import { Link, IndexLink } from 'react-router';

class HeaderDropdownLink extends React.Component {

  render() {
    return (
      <Link to={this.props.linkto} className="item" activeClassName="active">
        <i className={"fa fa-" + this.props.icon + " icon-right"} aria-hidden="true"></i>
        <span className="text">{this.props.text}</span>
      </Link>
    );
  }
}

export default HeaderDropdownLink;
