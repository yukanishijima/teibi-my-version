import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { myTheme } from '../../utils/myTheme';
import './style.css';

let savedYelpArray = [];

class ListLocations extends Component {

  state = {
    savedYelp: [],
    showList: true,
    showButton: false,
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

  changeShowButton = () => {
    this.setState({
      showButton: true,
    })
  }

  handleHideList = (e) => {
    e.preventDefault();
    if (this.state.showList === true) {
      this.setState({
        showList: false,
      })
      setTimeout(this.changeShowButton, 600);
    }
  }

  handleShowList = (e) => {
    e.preventDefault();
    if (this.state.showList === false) {
      this.setState({
        showList: true,
        showButton: false,
      })
    }
  }

  render() {
    const { data, displayClass } = this.props;

    if (typeof (data.error) !== "undefined") {
      return (
        <>
          <button className={this.state.showButton ? "show-btn" : "show-btn hide"} onClick={this.handleShowList}><i className="fas fa-angle-double-down"></i></button>
          <div id="locationList" className={this.state.showList === false ? `hide-list ${displayClass}` : `show-list ${displayClass}`}>

            <List id="progress" style={{ backgroundColor: myTheme.palette.secondary.main }}>
              <p>
                {data.error.code}
              </p>
            </List>
            <button className="hide-btn" onClick={this.handleHideList}><i className="fas fa-angle-double-up"></i></button>
          </div>
        </>
      )
    }
    else {
      if (typeof (data.businesses) !== "undefined") {
        return data.businesses.length > 0 ? (
          <>
            <button className={this.state.showButton ? "show-btn" : "show-btn hide"} onClick={this.handleShowList}><i className="fas fa-angle-double-down"></i></button>

            <div id="locationList" className={this.state.showList === false ? "hide-list" : "show-list"}>
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
        ) : (
            <>
              <button className={this.state.showButton ? "show-btn" : "show-btn hide"} onClick={this.handleShowList}><i className="fas fa-angle-double-down"></i></button>
              <div id="locationList" className={this.state.showList === false ? `hide-list ${displayClass}` : `show-list ${displayClass}`}>

                <List id="progress" style={{ backgroundColor: myTheme.palette.secondary.main }}>
                  <CircularProgress />
                </List>
                <button className="hide-btn" onClick={this.handleHideList}><i className="fas fa-angle-double-up"></i></button>
              </div>
            </>
          )
      } else {
        return (<></>);
      }
    }
  }

}

export default ListLocations;