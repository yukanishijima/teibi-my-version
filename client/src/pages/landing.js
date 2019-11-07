import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import API from "../utils/API";
import Help from './help';
import RandomUrl from '../components/randomurl';

// function Landing() {
class Landing extends Component {
  // state = {
  //   user: "guest1",
    
  // };

  // componentDidMount() {
  //   API.checkLogin().then(res => {
  //     console.log(res.data);
  //     console.log(res.data.username);
  //     this.setState({user: res.data.username});
  //     }
  //   );

  // };

  render() {
    return (
      <>
        {/* <p>{this.state.user}</p> */}
        <div className="App">
          <Help />
          <RandomUrl />
          <Link to="/signin">
            <button>Sign in</button>
          </Link>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </div>
      </>
    )
  }

}

export default Landing;