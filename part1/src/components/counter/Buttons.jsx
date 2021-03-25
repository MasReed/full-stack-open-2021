import React from 'react';

const Buttons = ({ handleClick, text }) =>
    <button style={{padding: '20px', margin: '0 5px', display: 'inline'}} onClick={handleClick}>{text}</button>

export default Buttons
