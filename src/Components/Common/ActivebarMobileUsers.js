import React, { Component } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Nav, NavDropdown } from "react-bootstrap";

import "./Activebar.css";
import { getCurrentDate } from "../../shared/utils";


import { logout ,getMobileUserProfile} from '../../api';
// import { getMobileUserProfile } from '../../apiMobileUsers';


export class ActivebarMobileUsers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
      companyName: null
    };
  }

  componentDidMount() {



    getMobileUserProfile().then(res => {
      console.log(res)
      this.setState({companyName :res.ddoName})  
    })
    .catch((err) => console.log(err));
  }


  render() {
    const user = sessionStorage.getItem("user-email");
    return (
      <Nav className="activebar">
        <u style={{ textTransform: "capitalize" }}>{window.location.pathname.replace('/', '')}</u>
        <div className="date-details">
          <span className="current-date">Date: {getCurrentDate()}</span>
          <span className="deductor-name">Company Name: {this.state.companyName}</span>
        </div>

        <div className="user-profile">
          <FaUserCircle />
          <Nav>
            <NavDropdown id="user-tag" title={user}>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
      </Nav>
    );
  }
}

export default ActivebarMobileUsers;
