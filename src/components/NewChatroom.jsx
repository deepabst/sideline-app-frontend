import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../App.css';
import ActionCable from 'action-cable-react-jwt';

class NewChatroom extends React.Component {

    state = {
        messages: [], // storesresults from API for render
        users: [],
        loading: true, // whether os not it's loading
        error: null,
        newTopic: ''
    }

    handleInput = (ev) => {
        this.setState({newTopic: ev.target.value})
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        console.log('Form submitted', this.state.newTopic);
        // tell the parent that the form was submitted and exactly what the submitted secret text was;
        // then the parent can post the data tot he rails backend via another AJAX request
        this.props.onSubmit(this.state.newTopic)
    }
    

    

    componentDidMount(){
        console.log('componentDidMount()');
        // this.getIndividualChatroom(this.props.match.params.id)
    }

    render (){


        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                        <input type= "text" onChange={this.handleInput} >

                        </input>
                
                <Button variant='primary'>
                    Create New Chatroom
                </Button>
                </form>
            </div>
        )
    }






}// class

export default NewChatroom;