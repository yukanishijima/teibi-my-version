import React, { Component } from 'react';
import Map from '../components/map';
import InfoButton from '../components/infobutton';
import CopyUrl from '../components/copyurl';
import Chat from '../components/chat';
import { Link } from "react-router-dom";
// import {  positions } from '@material-ui/system';

// import ListLocations from "../components/list"

class Main extends Component {
    state = {
        id: "",
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
                    <Link to="/">Teibi </Link>
                </h1>
                <Map />
                <InfoButton elevation={4}/>
                <CopyUrl elevation={4} text={window.location.href} />
                <Chat />
            </>
        )
    }
}

export default Main;