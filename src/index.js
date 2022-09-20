import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';
import ActionCable from 'action-cable-react-jwt'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Home />
    

);
