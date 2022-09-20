import React from "react";
import axios from "axios";

const BACKEND_BASE_URL = 'http://localhost:3000/players'

class PlayerEdit extends React.Component {

    state = {
        player: {},     // stores API response data
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
            } catch (error) {
                console.warn("trouble loading player from the API", error);
            } // catch
        } // fetchPlayer

    componentDidMount() {
        this.fetchPlayer(this.props.match.params.id);
    } // componentDidMount

    updatePlayer = async (player) => {
        console.log('Players::updatePlayer()', player.name, player.number);
        try {
            const res = await axios.put(BACKEND_BASE_URL+ '/' + id, {
                name,
                number
            });
            console.log('POST response:', res.data);
            // redirect to the players index
            this.props.history.push(`/players/${this.props.id}`)
        } catch (error) {
            console.warn('Error saving secret to backend', error);
        }
    } //updatePlayer

    handleInput = (ev) => {
        switch (ev.target.name) {
            case 'name':
                this.setState({ name: ev.target.value })
                break;
            case 'number':
                this.setState({ number: ev.target.value })
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault(); // stop submit from reloading page
        this.props.onSubmit(this.state.name, this.state.number);
    } // handleSubmit()

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input name="name" type="text" value="Dee" onChange={this.handleInput} />
                <label>Number</label>
                <input name="number" type="number" value="23" onChange={this.handleInput} />
                <button>Update Player</button>
            </form>
        ); // return
    } // render

} // class PlayerEdit

export default PlayerEdit;