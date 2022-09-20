import React from "react";
import axios from "axios";

const BACKEND_BASE_URL = 'http://localhost:3000/players'

class PlayerEdit extends React.Component {

    state = {
        player: { 
            name: '',
            number: 0
        },     // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?

    }

    fetchPlayer = async (id) => {
        try {
            const res = await axios.get(BACKEND_BASE_URL + '/' + id);
            this.setState({
                player: res.data,
                loading: false
            });
            console.log(`res.data--> ${res.data}`)
        } catch (error) {
            console.warn("trouble loading player from the API", error);
        } // catch
    } // fetchPlayer

    componentDidMount() {
        this.fetchPlayer(this.props.match.params.id);
    } // componentDidMount

    updatePlayer = async (player) => {
        const name = player.name;
        const number = player.number;
        const id = this.props.match.params.id;
        console.log('Players::updatePlayer()', name, number);
        try {
            const res = await axios.put(BACKEND_BASE_URL+ '/' + id, {
                name,
                number
            });
            console.log('PUT response:', res.data);
            // redirect to the player show page
            this.props.history.push(`/players/${this.props.match.params.id}`)
        } catch (error) {
            console.warn('Error saving secret to backend', error);
        }
    } //updatePlayer

    handleInput = (ev) => {
        this.setState({ player: {
            ...this.state.player, // leaves the rest of the obj intact
            [ev.target.name]: ev.target.value
        } })
    }

    handleSubmit = (ev) => {
        ev.preventDefault(); // stop submit from reloading page
        this.updatePlayer(this.state.player);
    } // handleSubmit()

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input name="name" type="text" value={this.state.player.name} onChange={this.handleInput} />
                <label>Number</label>
                <input name="number" type="number" value={this.state.player.number} onChange={this.handleInput} />
                <button>Update Player</button>
            </form>
        ); // return
    } // render

} // class PlayerEdit

export default PlayerEdit;