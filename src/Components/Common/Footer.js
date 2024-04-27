import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import "./Footer.css";
import facebook from "../../assets/facebook.png";
import Twitter from "../../assets/Twitter.png";
import Instagram from "../../assets/Instagram.png";

export default class Footer extends React.Component {

  render() {
    return (
      <div className="footer fluid-container" style={{marginBottom:-10}}>
        <div className="row">
          <div className="col-md-3">
            <h3>Company</h3>
            <ul>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
              <li><Link to="/">News</Link></li>
              <li><Link to="/">Jobs</Link></li>
              <li><Link to="/">Terms and Conditions</Link></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h3>Services</h3>
            <ul>
              <li><Link to="/">TDS filing</Link></li>
              <li><Link to="/">Tax solutions</Link></li>
              <li><Link to="/">Financial advise</Link></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h3>Contact</h3>
            <ul>
              <li>Mob: +919902991133</li>
              <li>Email: eTDSManager@gmail.com</li>
            </ul>
          </div>

          <div className="col-md-3">
            <div className="widgets_div">
              <ul className="follow-us">
                <li>
                  <Image src={facebook} alt="icon" />
                  <span>Facebook</span>
                </li>
                <li>
                  <Image src={Instagram} alt="icon" />
                  <span>Instagram</span>
                </li>
                <li>
                  <Image src={Twitter} alt="icon" />
                  <span>Twitter</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* <div style={{display:'flex',direction:'row',al}}> */}
        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-around', alignItems: 'center' }}>

            <p className="x">Wings e business services Copyright © 2022 </p>  
        <p className="x"> © powered by ksnalabs </p>
        </div>
        
        

      </div>
    );
  }
}
