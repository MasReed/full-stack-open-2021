import React, { useState } from 'react';

// components
import Header from './Header.jsx';
import Content from './Content.jsx';
import Total from './Total.jsx';
import Hello from './Hello.jsx';

const App = () => {
  const course = 'Half Stack application development'
  const allParts = [
      {
          name: 'Fundamentals of React',
          exercises: 10
      },
      {
          name: 'Using props to pass data',
          exercises: 7
      },
      {
          name: 'State of a component',
          exercises: 14
      }
  ];
  const aPerson = {
      name: 'Dave',
      age: 26
  };

  const [ counter, setCounter ] = useState(0);

  const incrementCounter = () => setCounter(counter + 1)
  const decrementCounter = () => setCounter(counter - 1)
  const resetCounter = () => setCounter(0)

  return (
    <div style={{padding: "2% 25%"}}>
      <Header title={course} />
      <Content parts={allParts} />
      <Total parts={allParts} />
      <hr />
      <Hello info={aPerson} />
      <hr />
      <h1>{counter}</h1>
      <button onClick={incrementCounter}>+</button>
      <button onClick={decrementCounter}>-</button>
      <button onClick={resetCounter}>Reset</button>
    </div>
    );
}

export default App
