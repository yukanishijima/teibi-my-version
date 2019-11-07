import React from 'react';

function ListLocations({data}) {
    return data.length > 0 ? (
        <ul id="locationList">
            {data.businesses.map(e => {
                return (
                    <li key={e.name}>
                    <img src={e.image_url} width="50" alt={e.name}></img>{e.name}
                    </li>
                )
            })}
        </ul>
    ) : <></>;
}

export default ListLocations;