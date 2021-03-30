import React from 'react';
// Components
import Course from './Course.jsx';

const ExercisesApp = (props) => {
    // Display information for a given course

    // Temporary data
    const courses =
    [
        {
            id: 1,
            name: 'Half Stack application development',
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            id: 2,
            name: 'Node.js',
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ];


    // Elements to render
    return (
        <>
        <hr />
        <h1>Exercises 2.1 - 2.5</h1>
        {/* 'Unpack' courses by mapping each to Course Component */}
        {courses.map( course => <Course key={course.id} course={course} />)}
        </>
    );
}

export default ExercisesApp;
