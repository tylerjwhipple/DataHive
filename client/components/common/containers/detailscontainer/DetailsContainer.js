import React from 'react';

import DetailsTableContainer from './DetailsTableContainer';
import Button from '../../elements/Button';

class DetailsContainer extends React.Component {

  render() {
    return (
      <div className={"details-pane" + (this.props.show ? " active" : "")}>
        <div className="hd">
          <span className="hd-text">Details</span>
          <Button text="CLOSE" icon="times" type="details-close" buttonclick={this.props.showdetail} />
          <Button text="Export To PDF" icon="file-pdf-o" type="pdf" />
        </div>
        <div className="body">
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default DetailsContainer;
