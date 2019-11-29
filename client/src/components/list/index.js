import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { myTheme } from '../../utils/myTheme';
import './style.css';

let savedYelpArray = [];

class ListLocations extends Component {

  state = {
    savedYelp: [],
    showList: true,
  }

  handleToggle = (e) => {
    e.preventDefault();

    //toggle the color of the heart 
    e.target.classList.toggle("red");

    const yelpId = e.target.dataset.yelp;
    const index = savedYelpArray.indexOf(yelpId);

    // unsave - if there's already an id in the array (if already saved), remove from the array
    if (index > -1) {
      savedYelpArray.splice(index, 1);
      this.setState({
        savedYelp: savedYelpArray,
      }, () => console.log(this.state.savedYelp))
    } else {
      // save - if there's no id in the array yet, add it to the array
      savedYelpArray.push(yelpId);
      this.setState({
        savedYelp: savedYelpArray,
      }, () => console.log(this.state.savedYelp))
    }
  }

  handleHideList = (e) => {
    e.preventDefault();
    if (this.state.showList === true) {
      this.setState({
        showList: false,
      })
    }
  }

  handleShowList = (e) => {
    e.preventDefault();
    if (this.state.showList === false) {
      this.setState({
        showList: true,
      })
    }
  }

  render() {

    const { data, displayClass } = this.props;

    return data.length > 0 ? (
      <>
        <button className="show-btn" onClick={this.handleShowList}><i className="fas fa-angle-double-down"></i></button>

        <div id="locationList" className={this.state.showList === false ? "hide-list" : "show-list"}>
          <List id="list" style={{ backgroundColor: myTheme.palette.secondary.main }}>

            {data.map((e, k) => {
              return (

                <ListItem key={e.name} alignItems="center" id="list-item">

                  <ListItemAvatar id="avater">
                    <Avatar alt={e.name} src={e.image_url} />
                  </ListItemAvatar>

                  <ListItemText id="content"
                    primary={<>
                      <span id="placeName" style={{ color: myTheme.palette.primary.main }}>{e.name}</span>
                    </>}
                    secondary={<>
                      <a href={"tel:" + e.phone} id="placePhone" style={{ color: myTheme.palette.primary.grey }}>{e.phone}</a>
                      <span id="placeAddress">{e.location.address1}</span>
                    </>}
                  />

                  <i className="fas fa-heart" onClick={this.handleToggle} id="fav-btn" data-yelp={e.id}></i>

                </ListItem>

              )
            })}
          </List>

          <button className="hide-btn" onClick={this.handleHideList}><i className="fas fa-angle-double-up"></i></button>
        </div>
      </>

    ) :
      <>
        <button className={`show-btn ${displayClass}`} onClick={this.handleShowList}><i className="fas fa-angle-double-down"></i></button>
        <div id="locationList" className={this.state.showList === false ? `hide-list ${displayClass}` : `show-list ${displayClass}`}>

          <List id="progress" style={{ backgroundColor: myTheme.palette.secondary.main }}>
            <CircularProgress />
          </List>
          <button className="hide-btn" onClick={this.handleHideList}><i className="fas fa-angle-double-up"></i></button>

        </div>;
    </>
  }
}

export default ListLocations;