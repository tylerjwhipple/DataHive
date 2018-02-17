import React from 'react';

class DetailsTableContainer extends React.Component {

  render() {
    return (
      <div className="details-table-container">
        <div className="details-table-container-hd">{this.props.hd}</div>
        {this.props.children}
      </div>
    );
  }
}

export default DetailsTableContainer;
