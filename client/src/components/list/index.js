import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { myTheme } from '../../utils/myTheme';
import './style.css';


const handleToggle = (e) => {
  e.preventDefault();
  const heart = e.target;
  heart.classList.toggle("red");
}

const handleHideList = (e) => {
  e.preventDefault();

}

function ListLocations({ data, displayClass }) {
  if(typeof(data.error) !== "undefined"){
    // console.log(data.error)
    return (

      <div id="locationList" className={displayClass}>
        <List id="progress" style={{ backgroundColor: myTheme.palette.secondary.main }} key={data.error.code}>
        <p>
          {data.error.code}
        </p>
        </List>
        <Button size="medium" id="hide-btn" onClick={handleHideList}><i className="fas fa-angle-double-up"></i></Button>
      </div>
    )
  }else{
  if(typeof(data.businesses) !== "undefined"){
    return data.businesses.length > 0 ? (
      <div id="locationList">
        <List id="list" style={{ backgroundColor: myTheme.palette.secondary.main }}>

          {data.businesses.map((e, k) => {
            return (
                <ListItem key={e.name} alignItems="center" id="list-item">
                  <ListItemAvatar id="avater">
                    <Avatar alt={e.name} src={e.image_url} />
                  </ListItemAvatar>
                  <ListItemText id="content"
                    primary={<>
                      <span id="placeName" style={{ color: myTheme.palette.primary.main }}>{e.name}</span>

                    </>}
                    secondary={
                      <>
                        <a href={"tel:" + e.phone} id="placePhone" style={{ color: myTheme.palette.primary.grey }}>{e.phone}</a>
                        <span id="placeAddress">{e.location.address1}</span>
                      </>
                    }
                  />
                  <i className="fas fa-heart" onClick={handleToggle} id="fav-btn"></i>
                </ListItem>
            )
          })}
        </List>
        <Button size="medium" id="hide-btn" onClick={handleHideList}><i className="fas fa-angle-double-up"></i></Button>
      </div>
    ) : <div id="locationList" className={displayClass}>
        <List id="progress" style={{ backgroundColor: myTheme.palette.secondary.main }}>
          <CircularProgress />
        </List>
        <Button size="medium" id="hide-btn" onClick={handleHideList}><i className="fas fa-angle-double-up"></i></Button>

      </div>;
    }else{
      return(<></>);
    }
  }
}

export default ListLocations;