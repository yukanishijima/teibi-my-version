import React from 'react';
import {usePosition} from 'use-position';
import Map from '../map'

const UserLocation = (props) => {
    const { latitude, longitude } = usePosition(true);
  
    return (
      <Map lat={latitude} long={longitude}/>
    );
  };
  export default UserLocation;