import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import TeamForm from "./TeamForm";

const BACKEND_BASE_URL = 'http://localhost:3000/teams'


function TeamLine(props) {
    return (
        <li className="team">
            <Link to={'/teams/' + props.team.id}>
                {props.team.name}
            </Link>
        </li>
    );// return
} // TeamLine


class Teams extends React.Component {
    state = {
        teams: [],    // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?
    } // state

    componentDidMount() {
        this.fetchTeams();
    } // componentDidMount

    fetchTeams = async () => {
        try {
            const res = await axios.get(BACKEND_BASE_URL);
            this.setState({
                teams: res.data,
                loading: false
            });
        } catch (error) {
            console.warn("trouble loading teams from the API", error);
        } // catch
    } // fetchTeams


    postTeam = async (name) => {
        console.log('Players::postTeam()', name);
        try {
            const res = await axios.post(BACKEND_BASE_URL, {
                name
            });
            console.log('POST response:', res.data);
            this.setState({
                teams: [res.data, ...this.state.teams]
            })
        } catch (error) {
            console.warn('Error saving secret to backend', error);
        }
    } // postTeam


    render() {
        return (
            <div className="App">
                <h1>Teams</h1>
                {
                    this.state.loading
                        ?
                        <p>Loading teams...</p>
                        :
                        <ul>
                            {
                                this.state.teams.map(t => <TeamLine key={t.id} team={t} />)
                            }
                        </ul>
                }
                <h2>Add a Team</h2>
                <TeamForm onSubmit={this.postTeam} />
            </div>
        );//return
    };//render
} //class Teams

export default Teams;

