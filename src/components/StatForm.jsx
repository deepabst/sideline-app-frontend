import React from "react";
import { Form, Button } from "react-bootstrap";

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
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="e.g. Kicks" onChange={this.handleInput} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Stat
                </Button>
            </Form>
        );// return
    } // render

} // class StatForm

export default StatForm;