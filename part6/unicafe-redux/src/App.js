import React from 'react'
import { createStore } from 'redux'
import reducer from './reducer'

function App() {

  const store = createStore(reducer)

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  
  return (
    <div>
      <button onClick={good}>good</button>
      <button>neutral</button>
      <button>bad</button>
      <button>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral</div>
      <div>bad</div>
    </div>
  );
}

export default App;
