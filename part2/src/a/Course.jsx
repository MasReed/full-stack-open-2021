import React from 'react';
// Components
import Header from './Header.jsx';
import Content from './Content.jsx';
import Total from './Total.jsx';

const Course = ({ course }) => {
    // Display content within each 'course' object

    return (
        <div>
            <Header title={course.name} />
            <Content content={course.parts}/>
            <Total content={course.parts} />
        </div>
    );
}

export default Course;
