import React, { Component } from "react";

import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import Sidebar from "../../Common/SidebarBU";
import Activebar from "../../Common/Activebar";

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <Header />

        <Activebar />

        <div className="leftbox">
          <Sidebar />
        </div>

        <div className="middlebox">
          <h5>Admin Dashboard Coming Soon!</h5>
        </div>

        <div style={{ clear: "both" }}></div>

        <Footer />
      </>
    );
  }
}
