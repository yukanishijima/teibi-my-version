import React from 'react';
import { usePosition } from 'use-position';
export const UserLocation = () => {
    const { latitude, longitude, timestamp, accuracy, error } = usePosition(true);
  
    return (
      <code>
        latitude: {latitude}<br/>
        longitude: {longitude}<br/>
        timestamp: {timestamp}<br/>
        accuracy: {accuracy && `${accuracy}m`}<br/>
        error: {error}
      </code>
    );
  };