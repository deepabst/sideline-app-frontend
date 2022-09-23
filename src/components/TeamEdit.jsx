import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";


let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000/teams';
} else {
  BASE_URL = 'https://sidelines-app.herokuapp.com/teams';
}

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
            const res = await axios.get(BASE_URL + '/' + id);
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
            const res = await axios.put(BASE_URL+ '/' + id, {
                name
            });
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
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="e.g. Kicks" value={this.state.team.name} onChange={this.handleInput} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update Team
                </Button>
            </Form>
        );//return
    }// render
} // class TeamEdit

export default TeamEdit;