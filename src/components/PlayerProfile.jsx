import React from "react";
import axios from "axios";

const BACKEND_BASE_URL = 'http://localhost:3000/players'

class PlayerProfile extends React.Component {
    
    state = {
        player: {},     // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?

    }

    fetchPlayer = async (id) =>{
        try {
            const res = await axios.get(BACKEND_BASE_URL+'/'+id);
            this.setState({
                player: res.data,
                loading: false
            });
        } catch (error) {
            console.warn("trouble loading player from the API", error);
        } // catch
    } // fetchPlayer

    componentDidMount() {
        console.log("Component Did Mount!");
        //this.props.match.params.origin ,this.props.match.params.destination
        this.fetchPlayer(this.props.match.params.id);
    } // componentDidMount

    render() {
        console.log(`PlayerProfile!!!!`)
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
                    </ul>
            }
            </div>
        );//return
    }//render
}// class PlayerProfile

export default PlayerProfile;