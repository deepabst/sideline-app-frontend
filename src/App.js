import React from 'react';
import axios from 'axios';
import ActionCable from 'action-cable-react-jwt';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
import { Route, Link, HashRouter as Router } from 'react-router-dom';
// knock Login
import Login from './components/Login'
import MyProfile from './components/MyProfile'

// Players
import Players from './components/Players';
import PlayerProfile from './components/PlayerProfile';
import PlayerEdit from './components/PlayerEdit';

// Teams
import Teams from './components/Teams';
import TeamProfile from './components/TeamProfile';
import TeamEdit from './components/TeamEdit';

// Stats
import Stats from './components/Stats';
import StatProfile from './components/StatProfile';
import StatEdit from './components/StatEdit';

//Matches
import Matches from './components/Matches';
import MatchProfile from './components/MatchProfile';
import MatchEdit from './components/MatchEdit';

//Chatrooms
import Chatrooms from './components/Chatrooms';

let BASE_URL;
let WS_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000';
  WS_URL = 'ws://localhost:3000/cable';
} else {
  BASE_URL = 'https://sidelines-app.herokuapp.com/';
  WS_URL = 'wss://sidelines-app.herokuapp.com/cable';
}

class App extends React.Component {

  // App state
  state = {
    // We store a reference to the current user. I'm going the lazy route and storing the whole user as an object.
    // Not the best way as we hold on to sensitive data like email and password digest.
    currentUser: {},
    cable: null
  }

  // function to run on component mounting
  componentDidMount() {
    //This is a function that will load once when you load the website. We just want to check if the user is logged in when we visit so we'll pass in the setCurrentUser function.
    this.setCurrentUser();
    this.createSocket();
  }

  createSocket = () => {
    // get your JWT token
    // this is an example using localStorage
    const yourToken = localStorage.getItem("jwt") // check with Luke whether we have to get separate token
    let App = {}
    App.cable = ActionCable.createConsumer(WS_URL, yourToken)
    this.setState({cable: App.cable})
    // const subscription = App.cable.subscriptions.create({channel: 'ChatsChannel'}, {
    //   connected: () => {},
    //   disconnected: () => {},
    //   received: (data) => { 
    //     console.log('broadcastMessagefrom ChatsChannel', data) 
    //   }
    // })
  }

  // function to set the state to the current logged in user
  setCurrentUser = () => {
    //This function gets the current user from your db (if there is one)
    // We declare a token which holds a json web token 'jwt' from your local storage. (We'll set this on the login page).
    // We do an axios request to the back end and ask if we're logged in already. We pass the jwt token as an auth header to let our server validate us.
    // If our token is valid then we set the state to our current user. If not you'll see a warning in your console that you're unauthorized.

    let token = localStorage.getItem("jwt");
    if (token === null) {
      // break out of the setcurrentuser method
      // when there is no user token
      return;
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.get(`${BASE_URL}/users/current`)
      .then(res => {
        this.setState({ currentUser: res.data })
      })
      .catch(err => console.warn(err))
  }

  // function to log the user out
  handleLogout = () => {

    // To completely reset logged in state:
    // 1. Set state of current user to undefined.
    // 2. Remove the jwt token from local storage
    // 3. Set axios default headers to undefined.

    this.setState({ currentUser: {} });
    localStorage.removeItem("jwt");
    axios.defaults.headers.common['Authorization'] = undefined;

  }

  render() {
    return (
      <Router>
        <header>
          <nav>
          <h1>SIDELINES</h1>
            {/* Show either logged in or logged out nav bar */}
            {
              this.state.currentUser.username !== undefined
                ?
                (
                  <ul>
                    <li>Welcome {this.state.currentUser.username}</li>
                    <li><Link to="/my_profile">My Profile</Link></li>
                    <li><Link to="/players">Players</Link></li>
                    <li><Link to="/teams">Teams</Link></li>
                    <li><Link to="/chatrooms">Chatrooms</Link></li>
                    <li><Link to="/stats">Stats</Link></li>
                    <li><Link to="/matches">Matches</Link></li>
                    <li><Link onClick={this.handleLogout} to='/'>Logout</Link></li>
                  </ul>
                )
                :
                (
                  <ul>
                    <li><Link to="/login">Login</Link></li>
                  </ul>
                )
            }
          </nav>
          <hr />
        </header>
        {/* if there is a user then display all the logged in links */}
        {this.state.currentUser.username &&
          (
            <div>
              <Route exact path="/my_profile"
                render={(props) => <MyProfile user={this.state.currentUser}{...props} />} />

                {/* PLAYERS */}
              <Route exact path="/players"
                render={(props) => <Players user={this.state.currentUser}{...props} />} />
              <Route exact path="/players/:id" component={PlayerProfile} />
              <Route exact path="/players/:id/edit" component={PlayerEdit} />
              
                {/* TEAMS */}
              <Route exact path="/teams"
                render={(props) => <Teams user={this.state.currentUser}{...props} />} />
              <Route exact path="/teams/:id"
                render={(props) => <TeamProfile user={this.state.currentUser}{...props} />} />
              <Route exact path="/teams/:id/edit"
                render={(props) => <TeamEdit user={this.state.currentUser}{...props} />} />
                
                {/* STATS */}
              <Route exact path="/stats"
                render={(props) => <Stats user={this.state.currentUser}{...props} />} />
              <Route exact path="/stats/:id"
                render={(props) => <StatProfile user={this.state.currentUser}{...props} />} />
              <Route exact path="/stats/:id/edit"
                render={(props) => <StatEdit user={this.state.currentUser}{...props} />} />


              <Route exact path="/matches"
                render={(props) => <Matches user={this.state.currentUser}{...props} />} />
              <Route exact path="/matches/:id"
                render={(props) => <MatchProfile user={this.state.currentUser}{...props} />} />
              <Route exact path="/matches/:id/edit"
                render={(props) => <MatchEdit user={this.state.currentUser}{...props} />} />

                {/* CHATROOMS */}
              {this.state.cable !== null && 
                <Route exact path="/chatrooms" render={(props) => <Chatrooms 
                  user={this.state.currentUser}
                  cable={this.state.cable}
                  {...props} />} />
              }
              </div>
          )
        }
        <Route
          exact path="/login"
          render={(props) => <Login setCurrentUser={this.setCurrentUser}{...props} />
          }
        />
      </Router>
    );//return
  }// render
} // class App

export default App;