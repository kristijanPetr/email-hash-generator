import React, { Component } from 'react';

import { render } from 'react-dom';
import Main from './Main';
import Header from './Header';
import './style.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
