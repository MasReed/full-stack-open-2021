import React, { useState } from 'react';

// components
import Header from './Header.jsx';
import Content from './Content.jsx';
import Total from './Total.jsx';
import Hello from './Hello.jsx';
import History from './History.jsx';
import Display from './Display.jsx';
import Button from './Buttons.jsx';


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

  // Counter State
  const [ counter, setCounter ] = useState(0);

  const incCount = () => setCounter(counter + 1)
  const decCount = () => setCounter(counter - 1)
  const resetCount = () => setCounter(0)

  // Clicker State (purposefully complex)
  const [ clicks, setClicks ] = useState({
      left: 0,
      right: 0
  });

  // Stateful Array
  const [allClicks, setAllClicks] = useState([]);

  const handleLeftClick = () => {
      setClicks({...clicks, left: clicks.left + 1});
      setAllClicks(allClicks.concat('L'));
  }

  const handleRightClick = () => {
      setClicks({...clicks, right: clicks.right + 1});
      setAllClicks(allClicks.concat('R'));
  }

  const resetClick = () => {
      setClicks({left: 0, right: 0});
      setAllClicks([]);
  }


  return (
    <div style={{padding: "2% 25%"}}>
      <Header title={course} />
      <Content parts={allParts} />
      <Total parts={allParts} />
      <hr />
      <Hello info={aPerson} />
      <hr />

      <div>
        <Display number={counter} />
        <Button handleClick={incCount} text={'+'}/>
        <Button handleClick={decCount} text={'-'}/>
        <Button handleClick={resetCount} text={'Reset'}/>
      </div>

      <hr />

      <div>
        <Display number={clicks.left} />
        <Button handleClick={handleLeftClick} text='Left'/>
        <Button handleClick={resetClick} text={'Reset'}/>
        <Button handleClick={handleRightClick} text={'Right'}/>
        <Display number={clicks.right} />
        <History allClicks={allClicks} />
      </div>
    </div>
    );
}

export default App
