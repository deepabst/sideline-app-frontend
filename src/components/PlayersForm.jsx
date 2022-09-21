import React from "react";

class PlayersForm extends React.Component {

    state = {
        name: '',
        number: 0
    }

    handleInput = (ev) => {
        this.setState({
            ...this.state, // leaves the rest of the obj intact
            [ev.target.name]: ev.target.value
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault(); // stop submit from reloading page
        this.props.onSubmit(this.state.name, this.state.number);
        this.setState({
            name: '',
            number: 0
        });
    } // handleSubmit()

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input name="name" type="text" onChange={this.handleInput} />
                {/* TODO: get available team jumper numbers only */}
                <label>Number</label>
                <input name="number" type="number" onChange={this.handleInput} />
                <button>Add</button>
            </form>
        ); // return
    } // render

} // class PlayersForm

export default PlayersForm;