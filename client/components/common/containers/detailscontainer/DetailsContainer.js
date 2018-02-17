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
          <DetailsTableContainer hd="Header">
          <table className="details-standard-table details-col-table">
              <tbody>
              <tr>
                  <td className="label-td">First Name:</td>
                  <td>Tyler</td>
                  <td className="label-td">Last Name:</td>
                  <td>Whipple</td>
              </tr>
              <tr>
                  <td className="label-td">MRN:</td>
                  <td>1456890</td>
                  <td className="label-td">SSN:</td>
                  <td>555-55-5555</td>
              </tr>
              <tr>
                  <td className="label-td">Gender:</td>
                  <td>Male</td>
                  <td className="label-td">Age:</td>
                  <td>29</td>
              </tr>
              <tr>
                  <td className="label-td">Address:</td>
                  <td>903 Skipton Drive</td>
                  <td className="label-td">City:</td>
                  <td>North Salt Lake</td>
              </tr>
              </tbody>
          </table>
          </DetailsTableContainer>
          <div className="details-table-container">
            <div className="details-table-container-hd">Demographics</div>
            <table className="details-standard-table details-col-table">
                <tbody>
                <tr>
                    <td className="label-td">First Name:</td>
                    <td>Tyler</td>
                    <td className="label-td">Last Name:</td>
                    <td>Whipple</td>
                </tr>
                <tr>
                    <td className="label-td">MRN:</td>
                    <td>1456890</td>
                    <td className="label-td">SSN:</td>
                    <td>555-55-5555</td>
                </tr>
                <tr>
                    <td className="label-td">Gender:</td>
                    <td>Male</td>
                    <td className="label-td">Age:</td>
                    <td>29</td>
                </tr>
                <tr>
                    <td className="label-td">Address:</td>
                    <td>903 Skipton Drive</td>
                    <td className="label-td">City:</td>
                    <td>North Salt Lake</td>
                </tr>
                </tbody>
            </table>
          </div>
          <div className="details-table-container">
            <div className="details-table-container-hd">Charges</div>
            <table className="details-standard-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Desc</th>
                        <th>Amount</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1011</td>
                    <td>This is a description of the Charges that were made. Testing longer description here.</td>
                    <td>$101.11</td>
                    <td>Finance</td>
                </tr>
                <tr>
                    <td>1011</td>
                    <td>This is a description of the Charges that were made</td>
                    <td>$101.11</td>
                    <td>Accounts</td>
                </tr>
                <tr>
                    <td>1011</td>
                    <td>This is a description of the Charges that were made</td>
                    <td>$101.11</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
          </div>
          <div className="details-table-container">
            <div className="details-table-container-hd">One Column Test</div>
            <table className="details-standard-table details-col-table">
                <tbody>
                <tr>
                    <td className="label-td">First Name:</td>
                    <td>Tyler</td>
                </tr>
                <tr>
                    <td className="label-td">MRN:</td>
                    <td>1456890</td>
                </tr>
                <tr>
                    <td className="label-td">Gender:</td>
                    <td>Male</td>
                </tr>
                <tr>
                    <td className="label-td">Address:</td>
                    <td>903 Skipton Drive</td>
                </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsContainer;
