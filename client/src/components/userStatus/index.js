import React, { Component } from 'react';
import ListLocations from "../list";
import DisplayBox from "./displayBox";
import API from "../../utils/API";
import './style.css'

// initialize socket
import { socket } from "../socket";

//getlist
import GetList from "./getList"

let room;
let user;
let loggedIn;


class userStatus extends Component {
  state = {
    status: [],
    apiResult: "",
    displayList: "hideList"
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

    API.checkLogin().then(res => {
      // console.log(res.data);
      // console.log(res.data.username + "im here");
      // this.setState({user: res.data.username});
      user = res.data.username;
      loggedIn = res.data.loggedIn;

      let userInfo = {
        room: room,
        username: user,
        loggedIn: loggedIn
      }

      socket.emit("joinRoom", userInfo);
    });
  }

  initSocket() {
    // catch joinRoom event from server and update state
    socket.on("joinRoom", rooms => {
      // console.log(socket.id);

      this.setState({
        status: this.convertToArray(rooms[room])
      }, () => {
        // console.log(this.state.status);
      });
    });

    // catch selected event from server and update state 
    socket.on("selected", async rooms => {
      // console.log(rooms);
      let selectedIcon = 0;
      let roomArray = this.convertToArray(rooms[room]);
      this.setState({
        status: roomArray
      }, () => {
        roomArray.forEach(e => {
          if(e.status === "Selected!"){
            selectedIcon++;
          }
        });
        if(selectedIcon === 2){
          this.setState({
            displayList: "displayList"
          });
        }
      });

      // const retrievedList =  GetList(this.state.status);
      // console.log("retrievedList")
      // console.log(GetList(this.state.status))
      const retrievedList = await GetList(this.state.status);
      // console.log(retrievedList);
      this.setState({
        apiResult: retrievedList
      });
    });

    // catch disconnecting event from server and update state
    socket.on("disconnecting", rooms => {
      this.setState({
        status: this.convertToArray(rooms[room])
      }, () => {
        // console.log(this.state.status);
      });
    });
  }

  convertToArray(obj) {
    let array = [];
    for (var p in obj) {
      let newObj = obj[p];
      newObj["userId"] = p;
      array.push(newObj);
    }
    return array;
  }


  render() {
    return (
      <>
        <DisplayBox status={this.state.status} />
        <ListLocations data={this.state.apiResult} displayClass={this.state.displayList}/>
      </>
    )
  }

}

export default userStatus;