import React from 'react';
import axios from 'axios';
import Chatrooms from './Chatrooms';


class IndividualChatroom extends React.Component {

    state = {
        messages: [],
        users: [],
        loading: true, 
        error: null,
        topic: ''

    }
    componentDidMount(){
        //       console.log('componentDidMount()');
               this.getIndividualChatroom()
           }

    getIndividualChatroom = (topic) => {
        axios.get( `http://localhost:3000/chats/${topic}` )
        .then( res => {
 //           console.log(`Chatrooms:`, res.data); 
            this.setState({messages: res.data})
            
        })
        .catch( err => {console.error('Loading error: ', err)
            
        })
    }//getChats


    render(){
        if(this.state.error !== null){
            return <p>There was an error loading chatrooms</p>;
        }

        return(
            <div>
            chatroom
            </div>
            
            
        )
    }




}// class

export default IndividualChatroom;