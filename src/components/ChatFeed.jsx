import React, { Component } from 'react';
import ChatMessage from './ChatMessage';

class ChatFeed extends Component {
    componentDidUpdate() {
        let messageDiv = document.getElementById('messages')
        messageDiv.scrollToTop = messageDiv.scrollHeight
    }

    displayMessages = (messages) => {
        return messages.map(message => {
            const avatar = this.whichAvatar(message)
            return <ChatMessage key={message.id} message={message} currentUser={this.props.currentUser}/>
        }) 
    }


    render() {
        return (
            <div id='chat-feed'>
                <h3>Chat Feed:</h3>
                <div id='messages'>
                    { this.props.chat.messages ? (
                        this.displayMessages(this.props.chat.messages)
                    ) : (
                        <h3>Be the first person to leave a message!</h3>
                    ) }
                </div>
            </div>
        )
    }
}

export default ChatFeed