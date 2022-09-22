import React from "react";
import axios from "axios";

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000/teams';
} else {
  BASE_URL = 'https://sidelines-app.herokuapp.com/teams';
}

class TeamProfile extends React.Component {

    state = {
        team: {},
        loading: true,
        errors: null
    }

    fetchTeam = async (id) => {
        try {
            const res = await axios.get(BASE_URL + '/' + id);
            
            this.setState({
                team: res.data,
                loading: false
            });
        } catch (error) {
            console.warn("trouble loading team from the API", error);
        } // catch
    } // fetchTeam

    componentDidMount() {
        this.fetchTeam(this.props.match.params.id);
    } // componentDidMount

    deleteTeam = async () => {
        console.log('delete team ->', this.state.team.id)
        try {
            // send request to delete
            await axios.delete(BASE_URL + '/' + this.state.team.id);
            
            // redirect to the teams index
            this.props.history.push(`/teams`)
        } catch (error) {
            console.warn("trouble deleting team", error);
        } // catch
    }
    editTeam = () => {
        this.props.history.push(`/teams/${this.state.team.id}/edit`)
    }

    render() {
        return (
            <div>Team Page
                {
                    this.state.loading
                        ?
                        <p>Loading team...</p>
                        :
                        <ul>
                            <li>Name: {this.state.team.name}</li>
                            <button onClick={this.editTeam}>Edit</button>
                            <button onClick={this.deleteTeam}>Delete</button>
                        </ul>
                }
            </div>
        );//return
    }//render

} // class TeamProfile

export default TeamProfile;