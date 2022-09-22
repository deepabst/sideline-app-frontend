import React from "react";
import axios from "axios";

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000/players';
} else {
  BASE_URL = 'https://sidelines-app.herokuapp.com/players';
}

class PlayerProfile extends React.Component {

    state = {
        player: {},     // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?

    }

    fetchPlayer = async (id) => {
        try {
            const res = await axios.get(BASE_URL + '/' + id);
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

    deletePlayer = async () => {
        console.log('delete player ->', this.state.player.id)
        try {
            // send request to delete
            await axios.delete(BASE_URL + '/' + this.state.player.id);
            // redirect to the players index
            this.props.history.push(`/players`)
        } catch (error) {
            console.warn("trouble deleting player", error);
        } // catch
        
    }
    
    editPlayer = () => {
        this.props.history.push(`/players/${this.state.player.id}/edit`)
    }

    render() {

        return (
            <div>Player profile
                {
                    this.state.loading
                        ?
                        <p>Loading player...</p>
                        :
                        <ul>
                            <li>Name: {this.state.player.name}</li>
                            <li>Number: {this.state.player.number}</li>
                            <button onClick={this.editPlayer}>Edit</button>
                            <button onClick={this.deletePlayer}>Delete</button>
                        </ul>
                }
            </div>
        );//return
    }//render
}// class PlayerProfile

export default PlayerProfile;