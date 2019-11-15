import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { myTheme } from '../../utils/myTheme';
import './style.css';
import API from "../../utils/API";

let loggedIn;

API.checkLogin().then(res => {
  loggedIn = res.data.loggedIn;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(myTheme => ({
  root: {
    backgroundColor: myTheme.palette.primary.secondary,
    minWidth: 256,
    width: "60vw",
    maxWidth: 500,
    height: "100%",
    position: 'relative',
  },
  rootLogOut: {
    backgroundColor: myTheme.palette.primary.secondary,
    minWidth: 256,
    width: "60vw",
    maxWidth: 500,
    minHeight: 230,
    position: 'relative',
  },
}));


export default function FloatingActionButtonZoom() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };


  let urlClean = window.location.pathname.split('/')[2]
  let finalUrlSignIn = "/signin/?" + urlClean;
  let finalUrlSignUp = "/signup/?" + urlClean;


  const handleLogOut = () => {
    API.logoutUser().then(res => {
      alert("You have successfully logged out.");
      window.top.location.replace("/");
    });
  };


  return (
    <>
      {loggedIn ? (
        <div className={classes.rootLogOut}>
          <div className="logout-container">
            <Typography id="msg" variant="h4" align="center" color="primary">See you soon!</Typography>
            <Button variant="outlined" style={myTheme.palette.buttonTwo} onClick={() => handleLogOut()} id="logout">Log Out</Button>
          </div>
        </div>

      ) : (
          <div className={classes.root}>

            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="action tabs example"
              >
                <Tab label="Sign In" {...a11yProps(0)} />
                <Tab label="Sign Up" {...a11yProps(1)} />
              </Tabs>
            </AppBar>

            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >

              <TabPanel value={value} index={0} dir={theme.direction}>
                <Typography id="msg" variant="h4" align="center" color="primary">Hello, again!</Typography>
                <iframe id="signIn" className="signIn" title="Sign In" frameBorder="0" src={finalUrlSignIn}>
                </iframe>
              </TabPanel>

              <TabPanel value={value} index={1} dir={theme.direction}>
                <Typography id="msg" variant="h4" align="center" color="primary">Welcome to Teibi!</Typography>
                <iframe id="signUp" className="signUp" title="Sign Up" frameBorder="0" src={finalUrlSignUp}>
                </iframe>
              </TabPanel>

            </SwipeableViews>

          </div>
        )}
    </>
  );
}