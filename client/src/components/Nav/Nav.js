import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';



const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Nav = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{backgroundColor: 'white'}}>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <img src = "https://i.imgur.com/SB0VyTQ.png" style={{width:'15%', height: '100%'}}/>
          </Typography>
  
          <Button color="black" style={{padding: 20}}>Politics</Button>
          <Button color="black" style={{padding: 20}}>Business</Button>
          <Button color="black" style={{padding: 20}}>Sports</Button>
          <Button color="black" style={{padding: 20}}>Entertainment</Button>
          <Button color="black" style={{padding: 20}}>Technology</Button>
          <Button color="black" style={{padding: 20}}>Health</Button>
          <Button color="black" style={{padding: 20}}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);
