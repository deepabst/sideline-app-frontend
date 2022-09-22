import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import StatForm from "./StatForm";

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000/stats';
} else {
  BASE_URL = 'https://sidelines-app.herokuapp.com/stats';
}


function StatLine(props) {
    return (
        <li className="stat">
            <Link to={'/stats/' + props.stat.id}>
                {props.stat.name}-{props.stat.count}
            </Link>
        </li>
    );
} // StatLine

class Stats extends React.Component {

    state = {
        stats: [],    // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?
    } // state

    componentDidMount() {
        this.fetchStats();
    } // componentDidMount

    fetchStats = async () => {
        console.log("Running fetch Stats...")
        try {
            const res = await axios.get(BASE_URL);
            this.setState({
                stats: res.data,
                loading: false
            });
        } catch (error) {
            console.warn("trouble loading stats from the API", error);
        } // catch
    } // fetchStats

    postStat = async (name) => {
        console.log('Players::postStat()', name);
        try {
            const res = await axios.post(BASE_URL, {
                name
            });
            console.log('POST response:', res.data);
            this.setState({
                stats: [res.data, ...this.state.stats]
            })
        } catch (error) {
            console.warn('Error saving stat to backend', error);
        }
    } // postStat

    render() {
        return (
            <div className='App'>
                <h1>Stats</h1>
                {
                    this.state.loading
                        ?
                        <p>Loading stats...</p>
                        :
                        <ul>
                            {
                                this.state.stats.map(s => <StatLine key={s.id} stat={s} />)
                            }
                        </ul>
                }
                <h2> Add a Stat </h2>
                <StatForm onSubmit={this.postStat} />
            </div>
        );//return
    }// render

} // class Stats

export default Stats;