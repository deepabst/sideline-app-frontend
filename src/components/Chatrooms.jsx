import React from 'react';
import axios from 'axios';
import NewChatroom from './NewChatroom';
import ActionCable from 'action-cable-react-jwt';
import IndividualChatroom from './IndividualChatroom';
import { Route, HashRouter as Router, Link } from 'react-router-dom'

const RAILS_CHATS_BASE_URL = 'http://localhost:3000/chats'

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
        axios.get( RAILS_CHATS_BASE_URL )
        .then( res => {
 //           console.log(`Chattooms:`, res.data); 
            this.setState({chatrooms: res.data})
            
        })
        .catch( err => {console.error('Loading error: ', err)
            
        })
    }//getChats

    postChatroom = async (text) => {
        console.log('Chatrooms::postChatroom()', text)
        try {
            const res = await axios.post
            (RAILS_CHATS_BASE_URL, {
                
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
                
            
                <ul>
                    {this.state.chatrooms.map (c =>
                    <li key={c.id}><Link to={`/chatrooms/${c.id}`}>{c.topic}</Link> Created by {c.user}</li> 
                     )}
                </ul>
                
            </div>
        
        )

    }// render





}//class

export default Chatrooms