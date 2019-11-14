import React, { Component } from 'react';
import Map from '../components/map';
import InfoButton from '../components/infobutton';
import CopyUrl from '../components/copyurl';
import Chat from '../components/chat';
import Help from '../pages/help';
import UserStatus from '../components/userStatus';
import 'normalize.css';

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
                <Help />
                <UserStatus />
                <InfoButton />
                <CopyUrl text={window.location.href} />
                <Chat />
            </>
        )
    }
}

export default Main;