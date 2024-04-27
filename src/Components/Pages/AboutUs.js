import React from "react";

import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Sidebar from "../Common/Sidebar";

const AboutUs = () => {

  return (
    <div>
      <Header />

      <div className="leftbox" >
          <Sidebar />
        </div>

      <div className="container static-page">
        About Us page
      </div>
      <div style={{ clear: "both" }}></div>

      <Footer />
    </div>
  );
};

export default AboutUs;
