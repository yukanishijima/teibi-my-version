import React, { Component } from 'react';
// eslint-disable-next-line
import { Input, Button } from '@material-ui/core';
import './style.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { socket } from '../socket'; // initialize socket
// import $ from 'jquery';

// set up default primary color
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#005f56",
      secondary: "#00897b",
    },
    secondary: {
      main: '#ffe57f',
    },
  },
});

//scroll feature but make messages recent stay low
// const scrollChat = () =>{
//  $(".chatScroll").animate({ scrollTop: $('.chatScroll')[0].scrollHeight}, 1000);
//   console.log("scroll")
// }

class Chat extends Component {
  state = {
    username: '',
    chatting: false,
    msg: '',
    chat: []
  };

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

  onMessageSubmit = () => {
    socket.emit('chat message', this.state.msg);
  };

  userNameInitials() {
    let name = this.state.username;
    let res = name.slice(3, 6);
    return <div className='avatar'>{res.toUpperCase()}</div>
  }

  //displaying the chat history
  renderChat() {
    const { chat } = this.state;
    return chat.map(({ username, msg }, i) => (
      <li className={username === chat[0].username ? 'chat' : 'chat-other'} key={i}>
        <span style={{ color: 'white' }}>{username}: </span>
        <div className="msg">{msg}</div>
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
      <div className="chatApp">
        <ThemeProvider theme={theme}>
          <Button
            onClick={this.startChatting}
            color="primary"
            variant="contained"
            id="chatB"
            style={{ display: this.state.chatting ? 'none' : 'block' }}
          >
            <i className="far fa-comment-alt"></i>
          </Button>
          <div className="chatBox" style={{ display: this.state.chatting ? 'block' : 'none' }}>
            <span className="CloseBtn" onClick={() => this.setState({ chatting: false })}>X</span>
            <div className="chatScroll" >{this.renderChat()}</div>
            <span className="textInputBox">
              <Input
                className="msgBox"
                placeholder="Say Hey!!!"
                name="msg"
                onChange={(e) => this.onTextChange(e)}
                value={this.state.msg}
                onKeyDown={this.handleKeyPress}
              />
              <Button
                onClick={this.onMessageSubmit}
                color="primary"
                variant="contained"
                id="send"
              >
                <i className="fa fa-paper-plane"></i>
              </Button>
            </span>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default Chat;