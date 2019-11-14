import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import '../../pages/help.css';
// import API from "../../utils/API";

// let loggedIn;

// API.checkLogin().then(res => {
//     loggedIn = res.data.loggedIn;

// });

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



const useStyles = makeStyles(myTheme => ({
    root: {
        backgroundColor: myTheme.palette.primary.secondary,
        minWidth: 256,
        width: "60vw",
        maxWidth: 500,
        height: 490,
        position: 'relative',
    },
}));


export default function FloatingActionButtonZoom() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <div className={classes.root}>

            
                    <>


                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <ol id="helplist">
                                <li>Go to https://teibi.ca/<br />or https//www.teibi.ca/
                                     <br />
                                     A new ID will be provided (XXXX-XXXX)
                                </li>
                                <li>Copy the URL
                                    <br />
                                    - Use the share link<br />
                                    - Use the share functionality on your browser</li>
                                <li>Share link</li>
                                <li>Select your starting point</li>
                                <li>Wait for the other user</li>
                                <li>A list of places will be presented</li>
                                <li>Pick one</li>
                                <li>See you there</li>
                                <li>See you next time</li>
                            </ol>

                        </SwipeableViews>
                    </>
             
        </div >
    );
}