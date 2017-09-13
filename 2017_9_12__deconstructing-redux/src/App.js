import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import Counter1 from './Counter1';
import Counter2 from './Counter2';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">

          <nav>
            <Link to="/">Root</Link>
            <Link to="/counter1">Counter #1</Link>
            <Link to="/counter2">Counter #2</Link>
          </nav>

          <Route path="/counter1" component={Counter1} />
          <Route path="/counter2" component={Counter2} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
