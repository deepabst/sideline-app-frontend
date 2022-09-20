import React from "react";

class PlayersForm extends React.Component {

    state = {
        name: '',
        number: 0
    }

    handleInput = (ev) => {
        switch (ev.target.name) {
            case 'name':
                this.setState({ name: ev.target.value })
                break;
            case 'number':
                this.setState({ number: ev.target.value })
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault(); // stop submit from reloading page
        this.props.onSubmit(this.state.name, this.state.number);
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