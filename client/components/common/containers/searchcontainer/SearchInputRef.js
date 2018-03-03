import React from 'react';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };  
}

  onInputChange(term) {
    this.props.searchChange(term);
  }

  render() {
    return (
      <div className="container-col" key={this.props.value}>
          <span className="input-label">{this.props.label}</span>
          <input className="search" type="text" value={this.state.term} ref={input => {this.onInputChange(this._name)}} />
      </div>
    );
  }


}

export default SearchInput;