import React from 'react';

const Part = ({ partName, exercises }) => {

    return (
        <>
            <div>
                <h3 style={{display: 'inline'}}>{partName}: </h3>
                <p style={{display: 'inline'}}>{exercises} exercises</p>
            </div>
        </>
    );
}

export default Part;
