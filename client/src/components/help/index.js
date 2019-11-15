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
				display: 'flex',
    		flexDirection: 'column',
				justifyContent: 'center',
				listStyleType:'disc',
    		paddingRight: 20
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
												<Typography id="helpBox">
                            <ul id="helplist">
                                <li>Share link with your buddy you wanna meet!</li>
                                <li>Drag the map to choose the location and click the marker to lock it.</li>
                                <li>Wait for the other user to select his/her location.</li>
                                <li>Teibi will populate a list of happy "meet me half way" locations 🏢 to choose 🚂 from  ⚖ 🔀.</li>
                                <li>Voila! See you there!</li>
																<li id="disclosure">PS: Locate yourself, chat with your buddy. We never store any of this information! We Promise! </li>
                            </ul>			
												</Typography>
                        </SwipeableViews>
                    </>
             
        </div >
    );
}