import React from 'react';

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
  const somePeople = [
      {
          name: 'Steve',
          age: 55
      },
      {
          name: 'Susan',
          age: 62
      }
  ];

  return (
    <div>
      <Header title={course} />
      <Content parts={allParts} />
      <Total parts={allParts} />
      <hr />
      <Hello info={aPerson} />
    </div>
    );
}

export default App
