import React from "react";
import axios from "axios";

const BACKEND_BASE_URL = 'http://localhost:3000/teams'

class TeamEdit extends React.Component {
    state = {
        team: { 
            name: ''
        },       // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?

    }

    fetchTeam = async (id) => {
        try {
            const res = await axios.get(BACKEND_BASE_URL + '/' + id);
            this.setState({
                team: res.data,
                loading: false
            });
            console.log(`res.data--> ${res.data}`)
        } catch (error) {
            console.warn("trouble loading team from the API", error);
        } // catch
    } // fetchTeam
    
    componentDidMount() {
        this.fetchTeam(this.props.match.params.id);
    } // componentDidMount
    
    updateTeam = async (team) => {
        const name = team.name;
        const id = this.props.match.params.id;
        console.log('teams::updateTeam()', name);
        try {
            const res = await axios.put(BACKEND_BASE_URL+ '/' + id, {
                name
            });
            console.log('PUT response:', res.data);
            // redirect to the team show page
            this.props.history.push(`/teams/${this.props.match.params.id}`)
        } catch (error) {
            console.warn('Error saving team to backend', error);
        }
    } //updateTeam

    handleInput = (ev) => {
        this.setState({ team: {
            ...this.state.team, // leaves the rest of the obj intact
            [ev.target.name]: ev.target.value
        } })
    }
        
    handleSubmit = (ev) => {
        ev.preventDefault(); // stop submit from reloading page
        this.updateTeam(this.state.team);
    } // handleSubmit()
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input name="name" type="text" value={this.state.team.name} onChange={this.handleInput} />
                <button>Update Team</button>
            </form>
        );//return
    }// render
} // class TeamEdit

export default TeamEdit;