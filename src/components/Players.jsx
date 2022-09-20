import axios from "axios";
import React from "react";
import PlayersForm from "./PlayersForm";
import PlayerProfile from "./PlayerProfile";
import { Route, Link, HashRouter as Router } from 'react-router-dom';

const BACKEND_BASE_URL = 'http://localhost:3000/players'

function PlayerLine(props) {
    console.log(props.player.id);
    return (
        <li className="player">
            <Link to={'players/'+props.player.id}>
                ({props.player.number}){props.player.name}
            </Link>
        </li>
    );
} // PlayerLine

class Players extends React.Component {

    state = {
        players: [],    // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?

    }

    componentDidMount() {
        console.log("Component Did Mount!");
        this.fetchPlayers();
    } // componentDidMount

    fetchPlayers = async () => {
        try {
            const res = await axios.get(BACKEND_BASE_URL);
            this.setState({
                players: res.data,
                loading: false
            });
        } catch (error) {
            console.warn("trouble loading players from the API", error);
        } // catch
    } // fetchPlayers

    postPlayer = async (name, number) => {
        console.log('Players::postPlayer()', name, number);
        try {
            const res = await axios.post(BACKEND_BASE_URL, {
                name,
                number
            });
            console.log('POST response:', res.data);
            this.setState({
                players: [res.data, ...this.state.players]
            })
        } catch (error) {
            console.warn('Error saving secret to backend', error);
        }
    } // postPlayer

    render() {
        return (
            <div className='App'>
                <Router>
                    <h1>Players</h1>
                    {
                        this.state.loading
                            ?
                            <p>Loading players...</p>
                            :
                            <ul>
                                {
                                    this.state.players.map(p => <PlayerLine player={p} />)
                                }
                            </ul>
                    }
                    <h2> Add a player </h2>
                    <PlayersForm onSubmit={this.postPlayer} />
                    <Route exact path="/players/:id" component={PlayerProfile} />
                </Router>
            </div>
        );
    }

} // class Players

export default Players;