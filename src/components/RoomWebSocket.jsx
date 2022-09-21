import React, { Component } from 'react';

class RoomWebSocket extends Component {
    componentDidMount() {
        // if I don't use the getRoomData() function here, nothing renders on the RoomShow component
        this.props.getRoomData(window.location.href.match(/\d+$/)[0])
        // the subscriptions.create() method is sending params to the subscribed action in my RoomsChannel
        this.props.cableApp.chat = this.props.cableApp.cable.subscriptions.create({
            channel: 'ChatsChannel',
            chat: window.location.href.match(/\d+$/)[0]
        }, 
        {
            received: (updatedChat) => {
                this.props.updateApp(updatedChat)
            }
        })
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default RoomWebSocket