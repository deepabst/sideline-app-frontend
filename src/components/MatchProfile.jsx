import React from "react";
import axios from "axios";
import moment from "moment";

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000/matches';
} else {
  BASE_URL = 'https://sidelines-app.herokuapp.com/matches';
}

class MatchProfile extends React.Component {

    state = {
        match: {},     // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?

    }

    fetchMatch = async (id) => {
        try {
            const res = await axios.get(BASE_URL + '/' + id);
            this.setState({
                match: res.data,
                loading: false
            });
        } catch (error) {
            console.warn("trouble loading match from the API", error);
        } // catch
    } // fetchMatch

    componentDidMount() {
        // note- the 'match' in this.props.match.params.id is unrelated to
        // sporting matches and the name of this component
        // - it is to do with url matches
        this.fetchMatch(this.props.match.params.id);
    } // componentDidMount

    deleteMatch = async () => {
        console.log('delete match ->', this.state.match.id)
        try {
            // send request to delete
            await axios.delete(BASE_URL + '/' + this.state.match.id);
            // redirect to the match index
            this.props.history.push(`/matches`)
        } catch (error) {
            console.warn("trouble deleting match", error);
        } // catch
        
    }

    editMatch = () => {
        this.props.history.push(`/matches/${this.state.match.id}/edit`)
    }

    render() {
        return (
            <div>
                <h3>Match View</h3>
            {
                this.state.loading
                    ?
                    <p>Loading match...</p>
                    :
                    <ul>
                        <li>Date: {moment(new Date(this.state.match.date)).format("DD/MM/YYYY")}</li>
                        <li>Ground: {this.state.match.ground}</li>
                        <li>Start: {moment(new Date(this.state.match.start)).format('HH:MM')}</li>
                        <li>Finish: {moment(new Date(this.state.match.finish)).format('HH:MM')}</li>
                        <li>Home: {this.state.match.home_score}</li>
                        <li>Away: {this.state.match.away_score}</li>
                        <button onClick={this.editMatch}>Edit</button>
                        <button onClick={this.deleteMatch}>Delete</button>
                    </ul>
            }
        </div>
        ); //return
    } // render
} // class MatchProfile

export default MatchProfile;