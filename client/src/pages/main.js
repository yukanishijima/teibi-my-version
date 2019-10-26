import React, { Component } from 'react';
import Toast from '../components/toast';
import Map from '../components/map';
import InfoButton from '../components/infobutton';
import CopyUrl from '../components/copyurl';
import Chat from '../components/chat';


class Main extends Component {

    render() {
        return (
            <>
                <h1>Main</h1>
                <Toast />
                <Map />
                <InfoButton />
                <CopyUrl />
                <Chat />
            </>
        )
    }
}

export default Main;