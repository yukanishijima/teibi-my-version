import React, { Component } from 'react';
import io from "socket.io-client";

// initialize socket
const socket = io();

// catch connection test event from server and display on page
socket.on("connection test", msg => {
  console.log(msg);
});

// catch status event from server and display to page
socket.on("joinRoom", msg => {
  console.log(msg);
});



class Toast extends Component {
  state = {
    userOneStatus: "offline",
    userTwoStatus: "offline"
  }

  componentDidMount() {
    // listen when there's a change in online/offline status
    window.addEventListener('online', this.updateOnlineStatus());
  }

  // check online or offline
  updateOnlineStatus() {
    // check if user is online
    let status;
    (navigator.onLine) ? status = "online" : status = "offline";

    // get the last 9 digits from url (XXXX-XXXX)
    let room = window.location.href;
    room = room.substring(room.lastIndexOf("/") + 1);

    // create object to store user information
    const userInfo = {
      status: status,
      room: room
    }

    // emit joinRoom event to server 
    socket.emit("joinRoom", userInfo);
  }



  render() {
    return (
      <>
        <div>
          <h2>Toast</h2>
          <h3>User 1 - <span id="userOne">{this.state.userOneStatus}</span></h3>
          <h3>User 2 - <span id="userTwo">{this.state.userTwoStatus}</span></h3>
        </div>
      </>
    )
  }
}

export default Toast;