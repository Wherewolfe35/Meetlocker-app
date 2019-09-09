import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  let componentList = ['Calendar', 'Leaderboard', 'Camp Log', 'Admin', 'Profile', 'Logout'];
  let navItem = 

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">{props.user && 'Login'}</h2>
      </Link>
      <div className="nav-right">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleNav}>
          <MoreVert />
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
        >
          <MenuItem >
            <Link className="nav-link" to="/home">
              {props.user.id ? 'Calendar' : 'Login / Register'}
            </Link>
          </MenuItem>
          {props.user.id && (
            <>
              <Link className="nav-link" to="/info">
                Info Page
          </Link> <br />
              <LogOutButton className="nav-link" />
            </>
          )}
          <MenuItem>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="nav-link" to="/camplog">
              Camp Log
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="nav-link" to="/leaderboard">
              Leaderboard
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="nav-link" to="/admin">
              Admin
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="nav-link" to="/profile">
              My Profile
            </Link>
          </MenuItem>
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
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
