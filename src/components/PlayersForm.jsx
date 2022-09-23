import React from "react";
import { Form, Button } from "react-bootstrap";

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
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="e.g. Lance Franklin" onChange={this.handleInput} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Number</Form.Label>
                    <Form.Control min={0} name="number" type="number" placeholder="23" onChange={this.handleInput} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Player
                </Button>
            </Form>
        ); // return
    } // render

} // class PlayersForm

export default PlayersForm;