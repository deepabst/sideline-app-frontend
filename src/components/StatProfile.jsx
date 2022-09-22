import React from "react";
import axios from "axios";

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000/stats';
} else {
  BASE_URL = 'https://sidelines-app.herokuapp.com/stats';
}
class StatProfile extends React.Component {

    state = {
        stat: {},     // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?
    }

    fetchStat = async (id) => {
        try {
            const res = await axios.get(BASE_URL + '/' + id);
            this.setState({
                stat: res.data,
                loading: false
            });
        } catch (error) {
            console.warn("trouble loading stat from the API", error);
        } // catch
    } // fetchStat

    componentDidMount() {
        this.fetchStat(this.props.match.params.id);
    } // componentDidMount

    deleteStat = async () => {
        console.log('delete stat ->', this.state.stat.id)
        try {
            // send request to delete
            await axios.delete(BASE_URL + '/' + this.state.stat.id);
            // redirect to the players index
            this.props.history.push(`/stats`)
        } catch (error) {
            console.warn("trouble deleting stat", error);
        } // catch
        
    }

    editStat = () => {
        this.props.history.push(`/stats/${this.state.stat.id}/edit`)
    }

    render() {
        return (
            <div>Stat profile
            {
                this.state.loading
                    ?
                    <p>Loading stat...</p>
                    :
                    <ul>
                        <li>Name: {this.state.stat.name}</li>
                        <li>Count: {this.state.stat.count}</li>
                        <button onClick={this.editStat}>Edit</button>
                        <button onClick={this.deleteStat}>Delete</button>
                    </ul>
            }
        </div>
        ); // return
    } // render
} // class StatProfile

export default StatProfile;