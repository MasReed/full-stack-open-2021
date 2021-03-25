import React from 'react';
import ReactDOM from 'react-dom';

// components
import Header from './Header.jsx';
import Content from './Content.jsx';
import Total from './Total.jsx';

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header title={course}/>
      <Content part={part1} n={exercises1}/>
      <Content part={part2} n={exercises2}/>
      <Content part={part3} n={exercises3}/>
      <Total exercises={[exercises1, exercises2, exercises3]}/>
    </>
    );
}

export default App
