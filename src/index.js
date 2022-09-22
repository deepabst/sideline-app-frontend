import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom'
// import * as serviceWorker from './serviceWorker'
import App from './App';
import ActionCable from 'action-cable-react-jwt'
// import actionCable from 'actioncable';

// const CableApp = {}

// CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />
    

);

// ReactDOM.render(
//   <Router>
//     <App cableApp={CableApp} />
//   </Router>,
//   document.getElementById('root')
// );

// serviceWorker.unregister();
