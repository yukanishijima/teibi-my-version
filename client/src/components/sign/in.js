import React from 'react';
import { Link } from "react-router-dom";

function SignIn({url}) {
    let urlClean = url.split('/')[2]
    let finalUrl = "/signin/?" + urlClean;
    return (
        <Link to={finalUrl}>
            <button>Sign in</button>
          </Link>
    )
}

export default SignIn;