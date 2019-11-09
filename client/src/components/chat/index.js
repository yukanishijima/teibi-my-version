import React, { Component } from 'react';
// eslint-disable-next-line
import { Input, Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { ChatBubble, Send } from '@material-ui/icons';
import './style.css';
// initialize socket
import { socket } from '../socket';


class Chat extends Component {
	state = {
		username: '',
		// users:[],
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
    
	socket.on('chat message', ({ username, msg}) => {
		this.setState({
			chat: [ ...this.state.chat, { username, msg } ]
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
	//displaying the chat history
	renderChat() {
    const { chat } = this.state;
		return chat.map(({ username, msg }, i) => (
			<div className={username===chat[0].username ? 'chat' : 'chat-other' } key={i}>
				<span style={{ color: 'aquablue',display: 'none' }}>{username}: </span>
				<div className="orangeAvatar">N</div>
				<div className="msg">{msg}</div>	
			</div>
		));
  }
  //handle enter click for message
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        this.onMessageSubmit();
    }
  }
  //scroll feature and make close button functional
	render() {
		return (
			<div className="chatApp">
				<ChatBubble
					onClick={this.startChatting}
					color="secondary"
					style={{ display: this.state.chatting ? 'none' : 'block' }}
				>
				  Chat
				</ChatBubble>
				<div className="chatBox" style={{ display: this.state.chatting ? 'block' : 'none' }}>
					<span className="CloseBtn" onClick={()=> this.setState({chatting:false})}>X</span>
					<span>{this.renderChat()}</span>
					<span className="textInputBox">
						<span>Message </span>
            <Input
              placeholder="Say Hey!!!" 
              name="msg" 
              onChange={(e) => this.onTextChange(e)}
              value={this.state.msg}
              onKeyDown={this.handleKeyPress}
            />
						<Send onClick={this.onMessageSubmit}></Send>
					</span>
				</div>
		  </div>
		);
	}
}

export default Chat;
