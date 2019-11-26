import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../../pages/help.css';

import Avatar from '@material-ui/core/Avatar';

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
        listStyleType: 'disc',
        paddingRight: 20
    },
}));


export default function FloatingActionButtonZoom() {
    const classes = useStyles();
   
    return (
        <div className={classes.root}>
            <Typography id="helpBox">
                <h1>Help</h1>
                <ul id="helplist">
                    <li>Share link with your buddy you wanna meet!</li>
                    <li>Drag the map to choose the location and click the marker to lock it.</li>
                    <li>Wait for the other user to select his/her location.</li>
                    <li>Teibi will populate a list of happy "meet me half way" locations <span role="img" aria-label="office building emoji">🏢</span> to choose <span role="img" aria-label="locomotive emoji">🚂</span> from <span role="img" aria-label="salance scale emoji">⚖</span> <span role="img" aria-label="shuffle tracks button emoji">🔀</span>.</li>
                    <li>Voila! See you there!</li>
                    <li id="disclosure">PS: Locate yourself, chat with your buddy. We never store any of this information! We Promise! </li>
                </ul>
                <h1>Team</h1>
                <table id="team">
                    <tr>
                        <td>
                            <a href="mailto:info@teibi.ca" title="Teibi"><Avatar>T</Avatar></a>
                        </td>
                        <td>
                            <a href="mailto:neha@teibi.ca" title="Neha"><Avatar>N</Avatar></a>
                        </td>
                        <td>
                            <a href="mailto:yuka@teibi.ca" title="Yuka"><Avatar>Y</Avatar></a>
                        </td>
                        <td>
                            <a href="mailto:stanley@teibi.ca" title="Stanley"><Avatar>S</Avatar></a>
                        </td>
                        <td>
                            <a href="mailto:hector@teibi.ca" title="Héctor"><Avatar>H</Avatar></a>
                        </td>
                    </tr>
                </table>
                <br />
            </Typography>
        </div >
    );
}