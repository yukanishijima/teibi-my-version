import React from 'react';
import Help from './help';
import RandomUrl from '../components/randomurl';

function Landing() {
  return (
    <>
      <div className="App">
        <Help />
        <RandomUrl />
        <button>Sign in</button>
        <button>Sign up</button>
      </div>
    </>
  );
}

export default Landing;