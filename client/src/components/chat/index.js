import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ChatButton from './chatButton';
import { socket } from '../socket';
import './style.css';



class Chat extends Component {
  state = {
    username: '',
    chatting: false,
    msg: '',
    chat: []
  };

  messagesEndRef = React.createRef();

  componentDidMount() {
    //catch username from server
    socket.on('username', (data) => {
      this.setState({
        username: data,
      })
    });

    socket.on('rooms', (data) => {
      this.setState({
        room: data
      })
    });

    socket.on('chat message', ({ username, msg }) => {
      this.setState({
        chat: [...this.state.chat, { username, msg }]
      })
      this.setState({ msg: '' });
    });
  }

  startChatting = () => {
    if (this.state.username) {
      this.setState({ chatting: true });
    }
  };

  //Grabbing the chat input
  onTextChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  userNameInitials() {
    let name = this.state.username;
    let res = name.slice(3, 6);
    return <div className='avatar'>{res.toUpperCase()}</div>
  }

  onMessageSubmit = () => {
    socket.emit('chat message', this.state.msg);
    // scrollChat;
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  //displaying the chat history
  renderChat() {
    const { chat } = this.state;
    return chat.map(({ username, msg }, i) => (
      <li className={username === chat[0].username ? 'chat' : 'chat-other'} key={i}>
        <span style={{ color: 'white' }}>{username}: </span>
        <span className="msg">{msg}</span>
      </li>
    ));
  }

  //handle enter click for message
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onMessageSubmit();
    }
  }

  render() {
    return (
      <>
        {/* WIDTH IS NOT GETTING OVERIDDEN */}
        {/* < div
          onClick={this.startChatting}
          color="primary"
          variant="contained"
          // id="chatB"
          style={{ display: this.state.chatting ? 'none' : 'block' }
          }
          className="chat-icon"
        >
          <img src="/images/chat-icon.png" alt="logo" />
        </div> */}

        <ChatButton startChatting={this.startChatting} chatting={this.state.chatting} />

        <div className="chatContainer" style={{ display: this.state.chatting ? 'block' : 'none' }}>

          <button className="CloseBtn" onClick={() => this.setState({ chatting: false })}>
            {/* <i className="fas fa-times"></i> */}
            <i className="fas fa-angle-double-down"></i>
          </button>

          <div className="chatBox">

            <Typography className="chatScroll" >
              {this.renderChat()}
              {/*scrolls messages down to the most recent one*/}
              {/* <div style={{ float: "left", clear: "both" }} */}
              <span style={{ float: "left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
              </span>
            </Typography>

          </div>

          <div className="textInputBox">
            <Typography>
              <input
                className="msgBox"
                placeholder="Say Hey!!!"
                name="msg"
                onChange={(e) => this.onTextChange(e)}
                value={this.state.msg}
                onKeyDown={this.handleKeyPress}
              ></input>
            </Typography>
            <Button
              onClick={this.onMessageSubmit}
              color="primary"
              variant="contained"
              id="send"
            >
              <i className="fa fa-paper-plane" style={{ color: "#efeed3" }}></i>
            </Button>
          </div>

        </div>
      </>
    );
  }
}

export default Chat;