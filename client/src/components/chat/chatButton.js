import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import { myTheme } from "../../utils/myTheme";
import './style.css';


const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


export default function ChatButton(props) {

  const classes = useStyles();

  return (
    <>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={props.startChatting} id="chat-icon">
        <Tooltip title={"Chat"} placement="top">
          <i className="far fa-comments" style={{ color: myTheme.palette.secondary.secondary }}></i>
        </Tooltip>
      </Fab>
    </>
  );
}
