


export default function createStore(reducer, enhancer) {

  if (typeof enhancer !== 'undefined') {
      return enhancer(createStore)(reducer)
  }


  let currentState = undefined;
  let currentReducer = reducer;
  let nextListeners = [];


  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    nextListeners.push(listener);
    console.log('listener count', nextListeners.length);

    return function unsubscribe() {
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      console.log('listener count unsub', nextListeners.length);
    }
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action)
    console.log('new state?', currentState);

    for (let i = 0; i < nextListeners.length; i++) {
      const listener = nextListeners[i];
      listener();
    }
  }

  dispatch({ type: '@@redux/INIT' });

  return  {
    getState,
    dispatch,
    subscribe
  }

}
