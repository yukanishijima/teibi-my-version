import React, { Component } from 'react';
import Toast from '../components/toast';
import Map from '../components/map';
import InfoButton from '../components/infobutton';
import CopyUrl from '../components/copyurl';
import UserLocation from '../components/userlocation';
import Chat from '../components/chat';
import { Link } from "react-router-dom";


class Main extends Component {
    state = {
        id: "",
        lat:"",
        long:""
    }

    componentDidMount() {
        this.setState({
            id: this.props.match.params.id
        })
    }

    render() {
        return (
            <>
                <h1>
                    <Link to="/">Main</Link>
                </h1>
                <UserLocation lat={this.state.lat}/>
                <Toast />
                <Map lat={this.state.lat}/>
                <InfoButton />
                <CopyUrl text={window.location.href}/>
                <Chat />
            </>
        )
    }
}

export default Main;