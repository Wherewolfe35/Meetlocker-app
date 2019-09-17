import React, { Component } from 'react';
import { connect } from "react-redux";

class Admin extends Component {
  state = {  }

  componentDidMount() {
    this.props.dispatch({type: 'GET_UNAPPROVED'});
  }

  render() { 
    return ( 
      <div>
        Admin
      </div>
     );
  }
}

const mapStateToProps = (state) => ({
users: state.admin.userList,
trophies: state.admin.trophyList
})
 
export default connect(mapStateToProps)(Admin);