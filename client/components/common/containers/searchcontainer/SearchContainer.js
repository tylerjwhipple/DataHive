import React from 'react';

import Button from '../../elements/Button';
import InputSelect from '../../elements/InputSelect';

class SearchContainer extends React.Component {

  constructor(props) {
    super(props)
    this.clickSubmit = this.clickSubmit.bind(this)
  }

  clickSubmit() {
    console.log('this was clicked');
  }

  render() {
    let searchlist = this.props.searchlist.map(list => {
      return  <div className="container-col" key={list.value}>
                <span className="input-label">{list.label}</span>
                <input className="search" type="text" name={list.value} />
              </div>;
    });

    return (
      <div className="search-container">
          <form onSubmit={this.handleSubmit}>
              {searchlist}
              <div className="container-col">
                <span className="input-label"></span>
              <Button text="Search" icon="search" type="search" buttonclick={this.clickSubmit}/>
              </div>
              {this.props.search.firstname}
          </form>
      </div>
    );
  }
}



export default SearchContainer;
