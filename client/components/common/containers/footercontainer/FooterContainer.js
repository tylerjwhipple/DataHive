import React from 'react';

import Button from '../../elements/Button';

class FooterContainer extends React.Component {
  render() {
    return (
      <div className="main-footer">

          <div className="results-numbers">1-20 of 100 results</div>

          <Button text="Export To Excel" icon="file-excel-o" type="excel"/>

          <div className="pagination-outer">
              <span className="pagination-item pagination-left-item"><i className="fa fa-chevron-left" aria-hidden="true"></i></span>
              <span className="pagination-item">1</span>
              <span className="pagination-item">2</span>
              <span className="pagination-item">3</span>
              <span className="pagination-item">4</span>
              <span className="pagination-item">5</span>
              <span className="pagination-item"><i className="fa fa-chevron-right" aria-hidden="true"></i></span>
          </div>

      </div>
    );
  }
}

export default FooterContainer;
