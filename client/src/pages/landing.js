import React from 'react';
import Help from './help';
import '../App.css';

function Landing() {
  return (
    <>
      <div className="App">
        <Help />
        <button>Continue to a map</button>
        <button>Sign in</button>
        <button>Sign up</button>
      </div>
    </>
  );
}

export default Landing;
