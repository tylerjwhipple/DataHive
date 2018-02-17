import React from 'react';

import Header from './common/header/Header';

const App = (props) => {
  return (
    <div>
      <Header />
      <div className="main-body">
          {props.children}
      </div>
    </div>
  );
};

export default App;