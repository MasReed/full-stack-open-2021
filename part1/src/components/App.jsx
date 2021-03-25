import React, { useState } from 'react';

// components
import Header from './Header.jsx';
import Content from './Content.jsx';
import Total from './Total.jsx';
import Hello from './Hello.jsx';
import Display from './counter/Display.jsx';
import Button from './counter/Buttons.jsx';


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

  const incCount = () => setCounter(counter + 1)
  const decCount = () => setCounter(counter - 1)
  const resetCount = () => setCounter(0)

  return (
    <div style={{padding: "2% 25%"}}>
      <Header title={course} />
      <Content parts={allParts} />
      <Total parts={allParts} />
      <hr />
      <Hello info={aPerson} />
      <hr />
      <Display counter={counter} />
      <Button handleClick={incCount} text={'+'}/>
      <Button handleClick={decCount} text={'-'}/>
      <Button handleClick={resetCount} text={'Reset'}/>
    </div>
    );
}

export default App
