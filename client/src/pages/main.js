import React, { Component } from 'react';
import Toast from '../components/toast';
import Map from '../components/map';
import InfoButton from '../components/infobutton';
import CopyUrl from '../components/copyurl';
import Chat from '../components/chat';


class Main extends Component {
    state = {
        id: ""
    }

    componentDidMount() {
        this.setState({
            id: this.props.match.params.id
        })
    }

    render() {
        return (
            <>
                <h1>Main</h1>
                <sub>{this.props.match.params.id}</sub>
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