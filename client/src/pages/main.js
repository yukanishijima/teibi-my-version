import React, { Component } from 'react';
<<<<<<< HEAD
import Map from '../components/map';
=======
>>>>>>> 9041714a816db714e17f1207ceeac70ecc3cd391
import InfoButton from '../components/infobutton';
import CopyUrl from '../components/copyurl';
import Chat from '../components/chat';
import { Link } from "react-router-dom";
import ListLocations from "../components/list"

class Main extends Component {
    state = {
        id: "",
<<<<<<< HEAD
=======
        lat: "",
        long: ""
>>>>>>> 9041714a816db714e17f1207ceeac70ecc3cd391
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