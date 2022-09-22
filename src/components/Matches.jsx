import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import MatchForm from "./MatchForm";
import moment from 'moment';

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000/matches';
} else {
  BASE_URL = 'https://sidelines-app.herokuapp.com/matches';
}

function MatchLine(props) {
    return (
        <li className="match">
            <Link to={'/matches/'+props.match.id}>
                {props.match.id} - {moment(new Date(props.match.date)).format("DD/MM/YY")}
            </Link>
        </li>
    );
} // PlayerLine

class Matches extends React.Component {

    state = {
        matches: [],    // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?
    } // state
    
    componentDidMount() {
        this.fetchMatches();
    } // componentDidMount

    fetchMatches = async () => {
        try {
            const res = await axios.get(BASE_URL);
            this.setState({
                matches: res.data,
                loading: false
            });
        } catch (error) {
            console.warn("trouble loading matches from the API", error);
        } // catch
    } // fetchMatches

    postMatch = async (date, ground, start, finish, home_score, away_score) => {
        console.log('Matches::postMatch()', date, );
        try {
            const res = await axios.post(BASE_URL, {
                date,
                ground,
                start,
                finish,
                home_score,
                away_score
            });
            console.log('POST response:', res.data);
            this.setState({
                matches: [res.data, ...this.state.matches]
            })
        } catch (error) {
            console.warn('Error saving match to the backend', error);
        }
    } // postMatch

    handleInput = (ev) => {
        this.setState({
            ...this.state, // leaves the rest of the obj intact
            [ev.target.name]: ev.target.value
        })
    }

    render() {
        return (
            <div className='App'>
                    <h1>Matches</h1>
                    {
                        this.state.loading
                            ?
                            <p>Loading Matches...</p>
                            :
                            <ul>
                                {
                                    this.state.matches.map(m => <MatchLine key={m.id} match={m} />)
                                }
                            </ul>
                    }
                    <h2> Add a Match </h2>
                    <MatchForm onSubmit={this.postMatch} handleInput={this.handleInput} />
            </div>
        );// return
    } // render
} // class Matches

export default Matches;