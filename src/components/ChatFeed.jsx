import React, { Component } from 'react';
import ChatMessage from './ChatMessage';

class ChatFeed extends Component {
    componentDidUpdate() {
        let messageDiv = document.getElementById('messages')
        messageDiv.scrollToTop = messageDiv.scrollHeight
    }

    displayMessages = (messages) => {
        // console.log('message in chatfeed', messages)
        return messages.map(message => {
            
            return <ChatMessage key={message.id} message={message.message} currentUser={message.user}/>
        }) 
    }


    render() {
        return (
            
            <div id='chat-feed'>
                
                <h5>Chat Feed:</h5>
                <div id='messages'>
                    { this.props.messages ? (
                        this.displayMessages(this.props.messages)
                    ) : (
                        <h6>please leave your meesage</h6>
                    ) }
                </div>
            </div>
        )
    }
}

export default ChatFeed