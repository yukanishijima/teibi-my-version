import React, { Component } from 'react';
import { Input, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import './style.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { socket } from '../socket'; // initialize socket
// import { myTheme } from '../utils/myTheme';

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
        <ThemeProvider theme={theme}>
        {/* WIDTH IS NOT GETTING OVERIDDEN */}
        <div
					onClick={this.startChatting}
          color="primary"
          variant="contained" 
          // id="chatB"
					style={{ display: this.state.chatting ? 'none' : 'block' }}
				><img src="/images/chat-icon.png" className="chat-icon" alt="logo"/>
        </div>				
				<div className="chatBox" style={{ display: this.state.chatting ? 'block' : 'none' }}>
					<span className="CloseBtn" onClick={()=> this.setState({chatting:false})}>X</span>
          <Typography className="chatScroll" >
            {this.renderChat()}
            {/*scrolls messages down to the most recent one*/}
            <span style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
            </span>
          </Typography>
					<div className="textInputBox">
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
              <i className="fa fa-paper-plane" style={{color: "#efeed3"}}></i>
            </Button>
					</div>
				</div>
        </ThemeProvider>
		);
	}
}

export default Chat;