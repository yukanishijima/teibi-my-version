import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from "@material-ui/core/Tooltip";
import LinearProgress from '@material-ui/core/LinearProgress';
import { myTheme } from '../../utils/myTheme';
import './style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2.5),
    marginBottom: theme.spacing(0.6),
    background: myTheme.palette.secondary.main,
    borderRadius: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "7vw",
    maxHeight: 30,
  }
}));


export default function PaperSheet(props) {
  const classes = useStyles();

  return (
    <>
      <Box id="userStatus">

        {props.status.map((el, i) =>
          <Paper className={classes.root} key={i}>

            <Tooltip title={!el.loggedIn ? "Anonymous" : "Verified"} placement="left-end" className="tooltip">
              <i className={!el.loggedIn ? "fas fa-user" : "fas fa-user-check"} style={{ color: myTheme.palette.primary.grey }}></i>
            </Tooltip>

            <Typography variant="body1" display="inline" color="primary">
              &nbsp;{el.userName}&nbsp;
            </Typography>

            <div id="progress-container">
              {el.status === "Selecting..." ?
                <LinearProgress color="primary" className="progress" /> :
                <i className="fas fa-check" style={{ color: myTheme.palette.primary.main }}></i>}
            </div>

          </Paper>
        )}

      </Box>
    </>
  );
}