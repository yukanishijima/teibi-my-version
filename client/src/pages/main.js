import React, { Component } from 'react';
import Map from '../components/map';
import InfoButton from '../components/infobutton';
import CopyUrl from '../components/copyurl';
import Chat from '../components/chat';
import Help from '../components/help';
import 'normalize.css';
import './main.css';
import { myTheme } from '../utils/myTheme';

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
        <div id="menu-btn" style={{ background: myTheme.palette.primary.main }}>
          <Help />
          <Chat />
          <CopyUrl text={window.location.href} />
          <InfoButton />
        </div>
      </>
    )
  }
}

export default Main;