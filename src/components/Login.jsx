import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


let BASE_URL;
if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://localhost:3000/';
} else {
    BASE_URL = 'https://sidelines-app.herokuapp.com/';
}

class Login extends React.Component {

    //The state this time needs to hold the email and password we're going to submit.
    state = {
        email: '',
        password: ''
    }

    // handle typing in the form
    handleInput = (ev) => {
        //If the form fields have a name of either 'password' or 'email' the switch case will recognise which form is being typed in and set the correct state. This avoids making a handleInputEmail and handleInputPassword function.
        // eslint-disable-next-line
        switch (ev.target.name) {
            case 'email':
                this.setState({ email: ev.target.value })
                break;
            case 'password':
                this.setState({ password: ev.target.value })
        }
    } //handleInput

    //handle the login submit
    handleSubmit = (ev) => {
        // Make a post request to the server and ask it to validate details.
        // create a request object to pass through to knock
        const request = { 'email': this.state.email, 'password': this.state.password }

        // do an axios post request to send user details to rails
        axios.post(`${BASE_URL}user_token`, { auth: request })
            .then(result => {
                localStorage.setItem("jwt", result.data.jwt)
                this.props.setCurrentUser();
                this.props.history.push('/my_profile');
            })
            .catch(err => {
                console.warn(err);
            })
        ev.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="e.g. jwinger@ga.com" onChange={this.handleInput} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="e.g chicken" onChange={this.handleInput} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        ); // return
    } // render

} // class login

export default Login;