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

  let componentList = ['Calendar', 'Leaderboard', 'CampLog', 'Profile'];
  let navItemList = <>{componentList.map(component => <MenuItem key={component}>
    <Link className="nav-link" to={'/' + component} onClick={handleClose}>
      {component}
    </Link>
  </MenuItem>
    )} < MenuItem >
      <LogOutButton className="nav-link" />
    </MenuItem> </>
  let adminItem = <MenuItem>
    <Link className="nav-link" to="/Admin" onClick={handleClose}>
      Admin
            </Link>
  </MenuItem>;

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">{props.state.user.id ? title : 'Login/Register'}</h2>
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
        > {props.state.user.id ? navItemList
          :
          <MenuItem className="nav-link" onClick={handleClose}>MeatLocker</MenuItem>}
          {props.state.user.isAdmin && adminItem}
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
