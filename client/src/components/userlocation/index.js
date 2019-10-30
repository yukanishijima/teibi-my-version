import React from 'react';
import { usePosition } from 'use-position';
const UserLocation = (props) => {
    const { latitude, longitude, timestamp, accuracy, error } = usePosition(true);
  
    return (
      <div>
        latitude: {latitude}<br/>
        longitude: {longitude}<br/>
        timestamp: {timestamp}<br/>
        accuracy: {accuracy && `${accuracy}m`}<br/>
        error: {error}
      </div>
    );
  };
  export default UserLocation;