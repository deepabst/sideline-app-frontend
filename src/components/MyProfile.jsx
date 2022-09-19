import React from "react";


class MyProfile extends React.Component {
    state = {
        currentUser: {
            username: '',
            email: ''
        }
    }

    render() {
        return (
            <div>
                <h1>Hello {this.props.user.username}</h1>
                <h4>Your email is {this.props.user.email}</h4>
            </div>
        ); // return
    }//render
} // class MyProfile

export default MyProfile;