import React from 'react';
import { Route, HashRouter as Router, Link } from 'react-router-dom';
import Chatrooms from './Chatrooms';
import ActionCable from 'action-cable-react-jwt'
import Chatroom from './NewChatroom';
import IndividualChatroom from './IndividualChatroom';
import App from '../App';


class Home extends React.Component {



    render() {
        return (
            <div>
                <Router>
                    <header>
                        <h1>WELCOME TO SIDELINES APP</h1>


                        <nav>
                            <Link to='/'>Home</Link>
                            {' '}|{' '}
                            <Link to='/chatrooms'>Chatrooms</Link>
                            {' '}|{' '}

                        </nav>
                        <hr />
                    </header>
                        <App />

                    <Route exact path="/chatrooms" component={Chatrooms} />
                    <Route exact path="/chatrooms/:id" component={IndividualChatroom} />



                </Router>
                <footer>
                    <hr />
                    <p>
                        &copy; DeEva 2022
                    </p>
                </footer>
            </div>
        )
    }// render


} // class

export default Home;