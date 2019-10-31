import React, { Component } from 'react';
import Toast from '../components/toast';
import InfoButton from '../components/infobutton';
import CopyUrl from '../components/copyurl';
import Chat from '../components/chat';
import { Link } from "react-router-dom";
import UserLocation from '../components/userlocation'

class Main extends Component {
    state = {
        id: "",
        lat:"",
        long:""
    }

    componentDidMount() {
        this.setState({
            id: this.props.match.params.id,
        })
    }
    render() {
        return (
            <>
                <h1>
                    <Link to="/">Main</Link>
                </h1>
                <Toast />
                <UserLocation />
                <InfoButton />
                <CopyUrl text={window.location.href}/>
                <Chat />
            </>
        )
    }
}

export default Main;