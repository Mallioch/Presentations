import React from 'react';
import store from './requacks/';
console.log('store?', store);


export default class Counter2 extends React.Component {

  constructor() {
    console.log('constructor');
    super();

    this.state = store.getState();
    console.log('constructor state?', this.state);
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.unsub = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.unsub();
  }

  handleClick = () => {
    store.dispatch({ type: 'INCREMENT' });
  }

  render() {
    return (
      <div>
        <h1>Counter 2</h1>

        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>increment</button>
      </div>
    );
  }

}
