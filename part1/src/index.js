import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import App2 from './customerFeedback/App.jsx';
import App3 from './anecdotesApp/App.jsx';

ReactDOM.render(
    <>
        <App />
        <App2 />
        <App3 />
    </>,
    document.getElementById('root')
);
