import React from 'react';
import ReactDOM from 'react-dom';
// App components
import App0 from './example/App.jsx';
import ExercisesApp from './exercise/a/ExercisesApp.jsx';
import PhonebookApp from './phonebook/PhonebookApp.jsx';


// Example
// ReactDOM.render(
//   <>
//   <PhonebookApp />
//   </>,
//   document.getElementById('root')
// );

// Exercise
ReactDOM.render(
    <>
        <App0 />
        <ExercisesApp />
    </>,
    document.getElementById('root')
);
