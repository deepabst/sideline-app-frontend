import React from 'react';
import axios from 'axios';
import NewChatroom from './NewChatroom';
import ActionCable from 'action-cable-react-jwt';
import IndividualChatroom from './IndividualChatroom';
import { Route, HashRouter as Router, Link } from 'react-router-dom'

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000/chats';
} else {
  BASE_URL = 'https://sidelines-app.herokuapp.com/chats';
}

class Chatrooms extends React.Component {

    state = {
        chatrooms: [], // storesresults from API for render
        loading: true, // whether os not it's loading
        error: null,
        
    }

    
    componentDidMount(){
 //       console.log('componentDidMount()');
        this.getChats()
    }

    getChats = () => {
        axios.get( BASE_URL )
        .then( res => {
 //           console.log(); 
            this.setState({chatrooms: res.data, loading: false})
            
        })
        .catch( err => {console.error('Loading error: ', err)
            
        })
    }//getChats

    // fakeData = {chat: {
    //     topic: 'fake',
    //     users: [],
    //     messages: [{id: 3, content: 'hello', chat_id: 1, user_id: 2}, {id: 4, content: 'helloha', chat_id: 2, user_id: 4}]}
    // }

    // getRoomDetailsByTopic = (topic) => {
    //     axios.get( `http://localhost:3000/chats/${topic}` )
    //     .then( res => {
    //         console.log(`individualChatroom:`, res.data); 
    //         this.setState({chatrooms: res.data})
            
    //     })
    //     .catch( err => {console.error('Loading error: ', err)
            
    //     })
    // }

    postChatroom = async (text) => {
        console.log('Chatrooms::postChatroom()', text)
        try {
            const res = await axios.post
            (BASE_URL, {
                
                topic: text
                });
            console.log('Post reponse', res.data);

            this.setState({
                chatrooms: [res.data, ...this.state.chatrooms]
            })
        } catch (err){
            console.error('Error saving chatroom to backend', err)
        }
    }// postChatroom

    

    render(){

        if(this.state.error !== null){
            return <p>There was an error loading chatrooms</p>;
        }

        return (
            
            <div>
                <NewChatroom onSubmit={this.postChatroom}/>
                
                {this.state.loading
                            ?
                            <p>Loading chatrooms...</p>
                            :           
                <ul>
                
                    {this.state.chatrooms.map (c =>
                    <li key={c.id} id='room-list'><br></br><Link to={`/chatrooms/${c.id}`}><img src="https://miro.medium.com/max/1400/1*ienXn8jgAJcTMoze9nIoEg.png" alt="chat" width='50' height='45'/>{c.topic}</Link><IndividualChatroom 
                    cable={this.props.cable}
                    chatData={c}/></li> 
                    )}
                
                </ul>
                }
                
            </div>
        
        )

    }// render





}//class

export default Chatrooms