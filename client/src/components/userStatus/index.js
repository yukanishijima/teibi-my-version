import React, { Component } from 'react';
import io from "socket.io-client";
import { set } from 'mongoose';

// initialize socket
const socket = io("/");
let room;

// catch connection test event from server and display on page
socket.on("connection test", msg => {
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

  updateOnlineStatus() {
    // get the last 9 digits from url (XXXX-XXXX)
    room = window.location.href;
    room = room.substring(room.lastIndexOf("/") + 1);

    // store room name
    let userInfo = {
      room: room
    }
    // emit joinRoom event to server 
    socket.emit("joinRoom", userInfo);
  }

  initSocket() {
    // catch joinRoom event from server and display to page
    socket.on("joinRoom", rooms => {
      console.log(socket.id);
      console.log(rooms[room]);
      console.log(rooms);
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