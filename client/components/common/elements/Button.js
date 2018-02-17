import React from 'react';

class Button extends React.Component {

  render() {
    return (
      <div className={"button " + this.props.type + "-button"} onClick={this.props.buttonclick}>
          <i className={"fa fa-" + this.props.icon + " " + this.props.type + "-icon"} aria-hidden="true"></i>
          <span className="button-text">{this.props.text}</span>
      </div>
    );
  }
}

export default Button;
