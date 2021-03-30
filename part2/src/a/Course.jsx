import React from 'react';
// Components
import Header from './Header.jsx';
import Content from './Content.jsx';

const Course = ({ course }) => {

    return (
        <div>
            <Header title={course.name} />
            <Content content={course.parts}/>
        </div>
    );
}

export default Course;
