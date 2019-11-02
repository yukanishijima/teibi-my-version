import React, { Component } from 'react';
import io from "socket.io-client";

// initialize socket
const socket = io("/");
let userId = "";


// let userId = "";

// catch connection test event from server and display on page
socket.on("connection test", msg => {
  console.log(msg);
  console.log(socket.id);
  userId = socket.id;
});


class Toast extends Component {
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
    const userInfo = {
      userId: userId,
      room: room
    }

    // emit joinRoom event to server 
    socket.emit("joinRoom", userInfo);
  }

  initSocket() {
    // catch joinRoom event from server and display to page
    socket.on("joinRoom", userInfo => {
      console.log("user joined");
      console.log(userInfo);
      console.log(`userId: ${userInfo.userId}`);

      if (userInfo.userId === userId) {
        this.setState({ userOneStatus: "online" });
      } else {
        this.setState({ userOneStatus: "online" });
        this.setState({ userTwoStatus: "online" });
      }
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

export default Toast;