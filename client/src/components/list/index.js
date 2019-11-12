import React from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: '50vw',
        minWidth: '50vw',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: '50vh',
        minHeight: '50vh'
    },
    inline: {
        display: 'inline',
    },
}));

function ListLocations({ data }) {
    const classes = useStyles();
    return data.length > 0 ? (
        <div id="locationList">
            <List className={classes.root}>
                {data.map(e => {
                    return (
                        <ListItem key={e.name} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={e.name} src={e.image_url} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${e.name} | <a href={"tel:"+e.phone}>${e.phone}</a>`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {e.location.address1}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    )
                })}
                <Divider variant="inset" component="li" />
            </List>
        </div>
    ) : <></>;
}

export default ListLocations;