import React from 'react';

const Filter = ({ onChange, value }) => {
    // Filter contacts for `value` on input change
    return (
        <>
            <div>
                <input
                    placeholder='Search Contacts...'
                    onChange={onChange}
                    value={value}
                />
            </div>
        </>
    );
}

export default Filter;
