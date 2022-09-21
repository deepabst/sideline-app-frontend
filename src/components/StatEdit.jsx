import React from "react";
import axios from "axios";

const BACKEND_BASE_URL = 'http://localhost:3000/stats'

class StatEdit extends React.Component {

    state = {
        stat: { 
            name: '',
            count: 0
        },     // stores API response data
        loading: true,  // has the response come back?
        errors: null    // any errors?

    }

    fetchStat = async (id) => {
        try {
            const res = await axios.get(BACKEND_BASE_URL + '/' + id);
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

    updateStat = async (stat) => {
        const name = stat.name;
        const count = stat.count;
        const id = this.props.match.params.id;
        console.log('Players::updateStat()', name, count);
        try {
            const res = await axios.put(BACKEND_BASE_URL+ '/' + id, {
                name,
                count
            });
            console.log('PUT response:', res.data);
            // redirect to the stat show page
            this.props.history.push(`/stats/${this.props.match.params.id}`)
        } catch (error) {
            console.warn('Error saving stat to backend', error);
        }
    } //updateStat

    handleInput = (ev) => {
        this.setState({ stat: {
            ...this.state.stat, // leaves the rest of the obj intact
            [ev.target.name]: ev.target.value
        } })
    }
    
    handleSubmit = (ev) => {
        ev.preventDefault(); // stop submit from reloading page
        this.updateStat(this.state.stat);
    } // handleSubmit()

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input name="name" type="text" value={this.state.stat.name} onChange={this.handleInput} />
            <label>Count</label>
            <input name="count" type="number" value={this.state.stat.count} onChange={this.handleInput} />
            <button>Update Stat</button>
        </form>
        ); // return
    } // render

} // class StatEdit

export default StatEdit;