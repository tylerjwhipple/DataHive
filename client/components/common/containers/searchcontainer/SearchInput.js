import React from 'react';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
  }

  render() {
    return (
      <div className="container-col" key={this.props.value}>
          <span className="input-label">{this.props.label}</span>
          <input className="search" type="text" value={this.state.term} onChange={event => {this.onInputChange(event.target.value)}} />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.searchChange(term);
  }
}

export default SearchInput;