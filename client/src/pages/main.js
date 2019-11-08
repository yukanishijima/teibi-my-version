import React, { Component } from 'react';
import Map from '../components/map';
import InfoButton from '../components/infobutton';
import CopyUrl from '../components/copyurl';
import Chat from '../components/chat';
// import SignIn from "../components/sign/in"

class Main extends Component {
    state = {
        id: ""
    }

    componentDidMount() {
        this.setState({
            id: this.props.match.params.id,
        })
    }

    render() {
        return (
            <>
                <Map />
                <InfoButton />
                <CopyUrl text={window.location.href} />
                {/* <SignIn url={window.location.pathname} /> */}
                <Chat />
            </>
        )
    }
}

export default Main;