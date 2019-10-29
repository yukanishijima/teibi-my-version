import React, { Component } from 'react';

class Toast extends Component {
  state = {
    statusUser1: "offline",
    statusUser2: "offline"
  }

  componentDidMount() {
    window.addEventListener('online', this.updateOnlineStatus());
    // window.addEventListener('offline', this.updateOnlineStatus());
  }

  updateOnlineStatus() {
    if (navigator.onLine) {
      this.setState({ statusUser1: "online" })
      console.log("you're connected");
    } else {
      this.setState({ statusUser1: "offline" })
      console.log("you lost connection");
    }
  }


  render() {
    return (
      <>
        <div>
          <h2>Toast</h2>
          <h3>User 1 - {this.state.statusUser1}</h3>
          <h3>User 2 - {this.state.statusUser2}</h3>
        </div>
      </>
    )
  }
}

export default Toast;