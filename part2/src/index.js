import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'
// App components
import App0 from './example/App.jsx';
import ExercisesApp from './exercise/a/ExercisesApp.jsx';
import PhonebookApp from './phonebook/PhonebookApp.jsx';
import CountriesApp from './countries/CountriesApp.jsx';


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
        <CountriesApp />
        <hr />
        <App0 />
        <hr />
        <ExercisesApp />
        <hr />
        <PhonebookApp />
        <hr />
    </>,
    document.getElementById('root')
);
