import React, { Component } from 'react';
import io from "socket.io-client";

// initialize socket
const socket = io("/");

// catch connection test event from server and display on page
socket.on("connection test", msg => {
  console.log("connection test")
  console.log(msg);
});


class userStatus extends Component {
  state = {
    userOneStatus: "offline",
    userTwoStatus: "offline"
  }

  componentDidMount() {
    // listen when there's a change in online/offline status
    window.addEventListener('online', this.updateOnlineStatus());
    this.initSocket();
  }

  // check online or offline
  updateOnlineStatus() {
    // get the last 9 digits from url (XXXX-XXXX)
    let room = window.location.href;
    room = room.substring(room.lastIndexOf("/") + 1);

    // create object to store user information
    let userInfo = {
      room: room
    }
    // emit joinRoom event to server 
    socket.emit("joinRoom", userInfo);
  }

  initSocket() {
    // catch joinRoom event from server and display to page
    socket.on("joinRoom", userInfo => {
      // console.log("user joined");
      socket.emit("sendInfo", userInfo);
    });

    socket.on("initialInfo", data => {
      console.log(data);
    });


    socket.on("change", data => {

    });

  }



  render() {
    return (
      <>
        <div id="userStatus">
          <h3>User 1 - <span id="userOne">{this.state.userOneStatus}</span></h3>
          <h3>User 2 - <span id="userTwo">{this.state.userTwoStatus}</span></h3>
        </div>
      </>
    )
  }
}

export default userStatus;