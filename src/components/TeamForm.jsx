import React from "react";
class TeamForm extends React.Component {

    state = {
        name: ''
    }

    handleInput = (ev) => {
        this.setState({ 
            ...this.state, // leaves the rest of the obj intact
            [ev.target.name]: ev.target.value
        })
    }
    
    handleSubmit = (ev) => {
        ev.preventDefault(); // stop submit from reloading page
        this.props.onSubmit(this.state.name);
    } // handleSubmit()

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input name="name" type="text" onChange={this.handleInput} />
                <button>Add</button>
            </form>
        );//return
    }// render
} // class TeamForm

export default TeamForm;