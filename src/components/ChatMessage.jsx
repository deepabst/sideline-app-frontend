import React, { Component } from 'react';

class ChatMessage extends Component {
    whichUser = () => {
        if (this.props.message.user_id === parseInt(this.props.currentUser.id)) {
            return 'current-user-message'
        } else {
            return 'other-user-message'
        }
    }
    
    render() {
        // when rendering the chat message, I need to first check whether the author of that message is my current user or not (by comparing ids)
        
        return (
            <div id="chat-message" className={this.whichUser()}>
                <h5><em>{this.props.currentUser}</em></h5>
                <h4>{this.props.message} </h4>
                
            </div>     
        )
    }
}

export default ChatMessage