import React from 'react';

// components
import Header from './Header.jsx';
import Content from './Content.jsx';
import Total from './Total.jsx';

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

  return (
    <div>
      <Header title={course} />
      <Content parts={allParts} />
      <Total parts={allParts} />
    </div>
    );
}

export default App
