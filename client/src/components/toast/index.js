import React, { Component } from 'react';
import io from "socket.io-client";

// initialize socket
const socket = io("/");

// catch connection test event from server and display on page
socket.on("connection test", msg => {
  console.log(msg);
});

// catch status event from server and dispay to page
socket.on("status", msg => {
  console.log(msg);
});



class Toast extends Component {
  state = {
    userOneStatus: "offline",
    userTwoStatus: "offline"
  }

  componentDidMount() {
    // check if user is online
    window.addEventListener('online', this.updateOnlineStatus());
  }

  // check online or offline
  updateOnlineStatus() {
    let status;
    (navigator.onLine) ? status = "online" : status = "offline";

    // emit status event to server
    socket.emit("status", status);

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