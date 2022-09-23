import React from "react";
import { Form, Button } from "react-bootstrap";
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
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="e.g. Hawthorn" onChange={this.handleInput} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Team
                </Button>
            </Form>
        );//return
    }// render
} // class TeamForm

export default TeamForm;