import React, { Component } from 'react';
import { IconButton, FormGroup, Button, Input } from '@material-ui/core';
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
		// console.log('chat is rendered');
    const { chat } = this.state;
    // console.log(this.state.chat)
    //emit is not working for other person
		return chat.map(({ username, msg }, i) => (
			<div key={i}>
				<span style={{ color: 'blue' }}>{username}: </span>
				<span>{msg}</span>
			</div>
		));
	}
	render() {
		return (
			<div className="chatApp">
				<IconButton
					onClick={this.startChatting}
					color="secondary"
					style={{ display: this.state.chatting ? 'none' : 'block' }}
				>
				  Chat
				</IconButton>
				<div className="chatBox" style={{ display: this.state.chatting ? 'block' : 'none' }}>
					<FormGroup className="messages">
						<div>{this.renderChat()}</div>
						<span>Message</span>
						<Input name="msg" onChange={(e) => this.onTextChange(e)} value={this.state.msg} />
						<Button onClick={this.onMessageSubmit}>Send</Button>
					</FormGroup>
				</div>
			</div>
		);
	}
}

export default Chat;
