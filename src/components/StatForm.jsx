import React from "react";

class StatForm extends React.Component {

    state = {
        name: '',
        count: 0
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
        //TODO: clear add Stat form
} // handleSubmit()

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input name="name" type="text" onChange={this.handleInput} />
            <button>New Stat</button>
        </form>
        );// return
    } // render

} // class StatForm

export default StatForm;