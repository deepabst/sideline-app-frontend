import axios from "axios";
import React from "react";

const BACKEND_BASE_URL = 'http://localhost:3000/players'

function PlayerLine(props) {
    return (
        <li className="player">
            ({props.player.number}){props.player.name}
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

    render() {
        return (
            <div className='App'>
                <h1>Players</h1>
                {/* TODO: Add a player here */}
                {
                    this.state.loading
                        ?
                        <p>Loading players...</p>
                        :
                        <ul>
                            {this.state.players.map(p => <PlayerLine player={p} />)}
                        </ul>
                }
            </div>
        );
    }

} // class Players

export default Players;