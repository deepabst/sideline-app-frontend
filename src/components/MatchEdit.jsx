import React from "react";
import axios from "axios";
import moment from "moment";

let BASE_URL;
if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://localhost:3000/matches';
} else {
    BASE_URL = 'https://sidelines-app.herokuapp.com/matches';
}

class MatchEdit extends React.Component {

    state = {
        game: {
            date: '',
            ground: '',
            start: '',
            finish: '',
            home_score: 100,
            away_score: 100
        },              // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?

    }

    fetchMatch = async (id) => {
        try {
            const res = await axios.get(BASE_URL + '/' + id);
            this.setState({
                game: res.data,
                loading: false
            });
            console.log(`res.data--> ${res.data}`)
        } catch (error) {
            console.warn("trouble loading match from the API", error);
        } // catch
    } // fetchMatch

    componentDidMount() {
        // this.props.match.params.id is nothing to do with Matches
        this.fetchMatch(this.props.match.params.id);
    } // componentDidMount

    updateMatch = async (game) => {
        const id = this.props.match.params.id;
        try {
            const res = await axios.put(BASE_URL+ '/' + id, {
                game,

            });
            console.log('PUT response:', res.data);
            // redirect to the match show page
            this.props.history.push(`/matches/${this.props.match.params.id}`)
        } catch (error) {
            console.warn('Error saving match to backend', error);
        }
    } //updateMatch

    handleInput = (ev) => {
            this.setState({ game: {
                ...this.state.game, // leaves the rest of the obj intact
                [ev.target.name]: ev.target.value
            } })
    }

    handleSubmit = (ev) => {
        ev.preventDefault(); // stop submit from reloading page
        this.updateMatch(this.state.game);
    } // handleSubmit()
        
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>Date</label>
            <input name="date" type="date" value={this.state.game.date} onChange={this.handleInput} />
            <label>Ground</label>
            <input name="ground" type="text" value={this.state.game.ground} onChange={this.handleInput} />
            <label>Home Score</label>
            <input name="home_score" type="number" value={this.state.game.home_score} onChange={this.handleInput} />
            <label>Away Score</label>
            <input name="away_score" type="number" value={this.state.game.away_score} onChange={this.handleInput} />
            <button>Edit Match</button>
        </form>
        );//return
    }//render
}// class MatchEdit

export default MatchEdit;