import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

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
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control name="date" type="date" onChange={this.props.handleInput} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Ground</Form.Label>
                        <Form.Control name="ground" type="text" onChange={this.props.handleInput} />
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control name="start" type="time" onChange={this.props.handleInput} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control name="finish" type="time" onChange={this.props.handleInput} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Home Score</Form.Label>
                            <Form.Control name="home_score" type="number" onChange={this.props.handleInput} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Away Score</Form.Label>
                            <Form.Control name="away_score" type="number" onChange={this.props.handleInput} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button variant="primary" type="submit">
                        Add Match
                    </Button>
                </Row>
            </Form>
        );//return
    } // render
} // class MatchForm

export default MatchForm;