import React from 'react';
import { Link } from "react-router-dom";

function SignUp({url}) {
    let urlClean = url.split('/')[2]
    let finalUrl = "/signup/?" + urlClean;
    return (
        <Link to={finalUrl}>
            <button>Sign Up</button>
          </Link>
    )
}

export default SignUp;