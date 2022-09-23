import React, { Component } from 'react';
import ChatFeed from './ChatFeed';
import RoomWebSocket from './RoomWebSocket';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000/messages';
} else {
  BASE_URL = 'https://sidelines-app.herokuapp.com/messages';
}

class IndividualChatroom extends Component {
    constructor() {
        super()
        this.state = {
            newMessage: '',
            messages: [],
            subscription: null
        }
    }

    componentDidMount() {
        const subscription = this.props.cable.subscriptions.create({channel: 'ChatsChannel', chat_id: this.props.chatData.id}, {
            connected: () => {},
            disconnected: () => {},
            received: (data) => { 
                // console.log('broadcastMessagefrom ChatsChannel', data)
                this.setState({messages: [data]}) 
            } //received
        }); // create
        this.setState({ subscription: subscription });
    } // componentDidMount

    displayUsers = (users) => {
         // return 'user'
        // return users.map( user => {
        //     return <li key={user.id}>{user.username}</li>
        // })
    }

    handleMessageInput = (event) => {
        this.setState({
            newMessage: event.target.value
        })
    }

    submitMessage = (event) => {
        event.preventDefault()

        this.setState({
            newMessage: ''
        })

        const message = {
            content: this.state.newMessage,
            // user_id: this.props.currentUser.id,
            chat_id: this.props.chatData.id
        }
        // console.log('message', message)
        
        axios.post(BASE_URL, {message: message})
        .then(result => {
            let messageDiv = document.getElementById('messages')
            console.log('resposne', result.data)
            messageDiv.scrollTop = messageDiv.scrollHeight
        })
    }

    render() {
        return (
            // <div>
            //     hello {console.log(this.props.chatData[0].topic)}
            // </div>
            <div>
                { Object.keys(this.props.chatData).length > 0 ? (
                    
                    <div id='room-show'>
                        <h4 id='room-header'>Welcome to <strong><em>{this.props.chatData.topic}</em></strong> {' '}Room!</h4>
                        <div id='room-sidebar'>
                            
                            <ul id='users-list'>
                                {this.displayUsers(this.props.chatData.users.data)}
                            </ul>
                        </div>
                        
                        <ChatFeed room={this.props.chatData} 
                        currentUser={this.props.currentUser} 
                        chat={this.props.chatData.messages}
                        messages={this.state.messages}/>
                        <form id='chat-form' onSubmit={this.submitMessage}>
                            <h6>Post a new message:</h6>
                            <textarea type='text' value={this.state.newMessage} onChange={this.handleMessageInput}></textarea>
                            <br></br>
                            <Button variant='primary' type='submit'>
                                Send Message
                            </Button>
                        </form>
                    </div>
                ) : null }
                
                {/* <RoomWebSocket
                    cableApp={this.props.cableApp}
                    updateApp={this.props.updateApp}
                    getChatData={this.props.getChatData}
                    chatData={this.props.chatData}
                /> */}
            </div>
        )
    }
}

export default IndividualChatroom