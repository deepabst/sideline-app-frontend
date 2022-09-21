import React, { Component } from 'react';
import ChatFeed from './ChatFeed';
import RoomWebSocket from './RoomWebSocket';

class IndividualChatroom extends Component {
    constructor() {
        super()
        this.state = {
            newMessage: ''
        }
    }

    displayUsers = (users) => {
        return users.map( user => {
            return <li key={user.id}>{user.username}</li>
        })
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
            user_id: this.props.currentUser.id,
            chat_id: this.props.chatData.chat.id
        }

        fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            content: JSON.stringify({message: message})
        })
        .then(resp => resp.json())
        .then(result => {
            let messageDiv = document.getElementById('messages')
            messageDiv.scrollTop = messageDiv.scrollHeight
        })
    }

    render() {
        return (
            <div>
                { Object.keys(this.props.chatData.chat).length > 0 ? (
                    <div id='room-show'>
                        <h1 id='room-header'>Welcome to the {this.props.chatData.chat.topic} Room!</h1>
                        <div id='room-sidebar'>
                            
                            <ul id='users-list'>
                                {this.displayUsers(this.props.chatData.chat.users.data)}
                            </ul>
                        </div>
                        <ChatFeed room={this.props.chatData.chat} currentUser={this.props.currentUser} />
                        <form id='chat-form' onSubmit={this.submitMessage}>
                            <h3>Post a new message:</h3>
                            <textarea type='text' value={this.state.newMessage} onChange={this.handleMessageInput}></textarea>
                            <br></br>
                            <input type='submit'></input>
                        </form>
                    </div>
                ) : null }
                
                <RoomWebSocket
                    cableApp={this.props.cableApp}
                    updateApp={this.props.updateApp}
                    getChatData={this.props.getChatData}
                    chatData={this.props.chatData}
                />
            </div>
        )
    }
}

export default IndividualChatroom