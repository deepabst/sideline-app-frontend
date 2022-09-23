import React from "react";

class MatchForm extends React.Component {

    state = {
        date: '',
        ground: '',
        start: '',
        finish: '',
        home_score: 0,
        away_score: 0     
    }

    handleSubmit = (ev) => {
        ev.preventDefault(); // stop submit from reloading page
        this.props.onSubmit(this.state.name, this.state.number);
        this.setState({
            date: '',
            ground: '',
            start: '',
            finish: '',
            home_score: 0,
            away_score: 0
        });
    } // handleSubmit()
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Date</label>
                <input name="date" type="date" onChange={this.props.handleInput} />
                <label>Ground</label>
                <input name="ground" type="text" onChange={this.props.handleInput} />
                <label>Start Time</label>
                <input name="start" type="time" onChange={this.props.handleInput} />
                <label>Finish Time</label>
                <input name="finish" type="time" onChange={this.props.handleInput} />
                <label>Home Score</label>
                <input name="home_score" type="number" onChange={this.props.handleInput} />
                <label>Away Score</label>
                <input name="away_score" type="number" onChange={this.props.handleInput} />
                <button>Add Match</button>
            </form>
        );//return
    } // render
} // class MatchForm

export default MatchForm;