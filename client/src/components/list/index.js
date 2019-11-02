import React from 'react';

function ListLocations({data}) {
    return (
        <ul>
            {data.businesses.map(e => {
                return (
                    <li key={e.name}>
                    <img src={e.image_url} width="50"></img>{e.name}
                    </li>
                )
            })}
        </ul>
    )
}

export default ListLocations;