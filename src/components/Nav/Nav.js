import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import MoreVert from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem } from '@material-ui/core/';



const Nav = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleNav(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  let title = props.location.pathname.slice(1);

  let componentList = ['Calendar', 'Leaderboard', 'CampLog', 'Profile', 'Admin', <MenuItem key="logout"> <LogOutButton className="nav-link" /> </MenuItem>];
  let navItemList = <>{componentList.map((component) => {
    if (component === 'Admin') {
      if (props.state.user.isAdmin) {
        return <MenuItem key={component}>
          <Link className="nav-link" to={'/' + component} onClick={handleClose}>
            {component}
          </Link>
        </MenuItem>;
      } else {
        return false;
      }
    } else if (typeof (component) !== 'string') {
      return component;
    } else {
      return (
        <MenuItem key={component}>
          <Link className="nav-link" to={'/' + component} onClick={handleClose}>
            {component}
          </Link>
        </MenuItem>
      )
    }
  })} </>;

  let loggedOutList = [<MenuItem className="nav-link" onClick={handleClose}>MeatLocker</MenuItem>];

  return (
    <div className="nav">
      <img className="navLogo" src='MeatLockerLogo.jpg' alt='Buck fighting a bear with bacon on the side' />
      <h2 className="nav-title">{props.state.user.id ? title : 'Login/Register'}</h2>
      <div className="nav-right">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleNav}>
          <MoreVert color="primary" />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        > {props.state.user.id ? navItemList
          :
          loggedOutList}
        </Menu>
      </div>
    </div>
  )
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  state
});

export default withRouter(connect(mapStateToProps)(Nav));
