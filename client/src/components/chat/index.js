import React, { Component } from 'react';
import {IconButton, FormGroup, Button, Input} from '@material-ui/core';
import './style.css';
// initialize socket
import { socket } from "../socket";

class Chat extends Component {  
  state = {
    username: '',
    chatting: false,
    messageText: '',
    messages: []
  }  
//Messages has to be an array of object

  componentDidMount() {
    //catch username from server
    socket.on("username",(data)=>{
      this.setState({
        username: data
      })
      //console.log(data);
    })
    // Whenever the server emits 'new message', update the chat body
//     socket.on("message", (data) => {
//       socket.emit("message",{
//       })
//     });
  }
/**
   *
   * Sends a message only if it is not falsy.
   */
  onSendClicked() {
    if (!this.state.messageText) {
      return;
    }
    document.querySelector(".messageTextBox").value="";

  }
  onMessageInputChange(e) {
  // array concat method -> creates a new array, leaving the old array intact, but also returning a new array from it.
    this.setState(state =>{
      this.setState({ messageText: e.target.value });
      const messages= state.messages.concat(e.target.value);
      return{
        messages
      }
 })
}
  /**
   *
   * @param {KeyboardEvent} e
   *
   * listen for enter pressed and sends the message.
   */
//   onMessageKeyPress(e) {
//     if (e.key === "Enter") {
//       this.onSendClicked();
//     }
//   }
  startChatting = () => {
    if (this.state.username) {
      console.log('startChatting')
      this.setState({ chatting: true })
    }
  }

render() {
    return (
      <div className="chatApp">
         <IconButton onClick={this.startChatting} color="secondary" style={{'display': this.state.chatting ? 'none' : 'block'}}>Chat</IconButton>
          <div className="chatBox" style={{'display': this.state.chatting ? 'block' : 'none'}}>
            <ul className="messages">
  {/* For chat -->append to here to keep on adding this */}
  {/* Should be able to clear chatbox once chat is send */}
  {/* Figure out a way to use socket io to emit message to every user */}
  {/* Minimize and maximize button for chat container --> Find in material ui*/}
  {/* For UI Z index for buttons, Map -->position-absolute, top:0 */}
            <p>{this.state.username}: {this.state.messages}</p>;
            </ul>
            <FormGroup>
                <Input
                  type="text"
                  value={this.state.messageText}
                  onChange={this.onMessageInputChange.bind(this)}
                  //onKeyPress={this.onMessageKeyPress.bind(this)}
                  placeholder="Type a message here (Limit 3000 characters)..."
                  ref="messageTextBox"
                  className="messageTextBox"
//                   maxLength="3000"
//                   autoFocus
                />
                  <Button
                    disabled={!this.state.messageText}
                    className="sendButton"
                    onClick={this.onSendClicked.bind(this)} 
                  >
                    Send
                  </Button>
            </FormGroup>
          </div>
      </div>
    );
  }
}

export default Chat;
