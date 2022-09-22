import axios from "axios";
import React from "react";
import PlayersForm from "./PlayersForm";
import { Link } from 'react-router-dom';

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000/players';
} else {
  BASE_URL = 'https://sidelines-app.herokuapp.com/players';
}

function PlayerLine(props) {
    return (
        <li className="player">
            <Link to={'/players/'+props.player.id}>
                {props.player.number}-{props.player.name}
            </Link>
        </li>
    );
} // PlayerLine

class Players extends React.Component {

    state = {
        players: [],    // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?
    } // state

    componentDidMount() {
        this.fetchPlayers();
    } // componentDidMount

    fetchPlayers = async () => {
        try {
            const res = await axios.get(BASE_URL);
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
            const res = await axios.post(BASE_URL, {
                name,
                number
            });
            console.log('POST response:', res.data);
            this.setState({
                players: [res.data, ...this.state.players]
            })
        } catch (error) {
            console.warn('Error saving player to backend', error);
        }
    } // postPlayer

    render() {
        return (
            <div className='App'>
                    <h1>Players</h1>
                    {
                        this.state.loading
                            ?
                            <p>Loading players...</p>
                            :
                            <ul>
                                {
                                    this.state.players.map(p => <PlayerLine key={p.id} player={p} />)
                                }
                            </ul>
                    }
                    <h2> Add a player </h2>
                    <PlayersForm onSubmit={this.postPlayer} />
            </div>
        );
    }

} // class Players

export default Players;