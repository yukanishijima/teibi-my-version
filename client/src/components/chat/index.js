import React, { Component } from 'react';
// eslint-disable-next-line
import { Input, Box, Avatar } from '@material-ui/core';
import { ChatBubble, Send } from '@material-ui/icons';
import './style.css';
// initialize socket
import { socket } from '../socket';

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
				username: data
			})
	});
	socket.on('room', (data) => {
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
			console.log('startChatting');
			this.setState({ chatting: true });
		}
	};
	//Grabbing the chat input
	onTextChange = (e) => {
		this.setState({ msg: e.target.value });
		console.log('message is', this.state.msg);
	};
	onMessageSubmit = () => {
		socket.emit('chat message', this.state.msg);
		console.log('message is submitted', this.state.msg);
	};
	//displaying the chat history
	renderChat() {
    const { chat } = this.state;
		return chat.map(({ username, msg }, i) => (
			<Box className="chat" key={i}>
				<span style={{ color: 'aquablue' }}>{username}: </span>
				<span>{msg}</span>
			</Box>
		));
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
					<span className="CloseBtn">X</span>
					<div>Chat Room: {this.state.room}</div>
					<div>{this.renderChat()}</div>
					<div className="textInputBox">
						<span>Message</span>
						<Input name="msg" onChange={(e) => this.onTextChange(e)} value={this.state.msg} />
						<Send onClick={this.onMessageSubmit}></Send>
						</div>
					</div>
				</div>
		);
	}
}

export default Chat;
