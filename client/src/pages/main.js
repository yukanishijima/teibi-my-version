import React, { Component } from 'react';
import Map from "../components/map"
import InfoButton from '../components/infobutton';
import CopyUrl from '../components/copyurl';
import Chat from '../components/chat';
import { Link } from "react-router-dom";
import ListLocations from "../components/list"

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
                <h1>
                    <Link to="/">Main</Link>
                </h1>
                <Map />
                <InfoButton />
                <CopyUrl text={window.location.href} />
                <Chat />
            </>
        )
    }
}

export default Main;