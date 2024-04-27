import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Image, Container, Row, Col } from "react-bootstrap";
import axiosClient from '../../api/config';
import { saveAs } from 'file-saver';

import "./Homepage.css";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homepage_logo from "../../assets/Homepage - image.jpg";

export default class Homepage extends Component {

  // handleDownload = () => { 
  //   const base = 'https://java.digicube.net.in:2087/cwp_1fb10987d2831439a044dac188a37b10/admin/fileManager_v2.php';
  //   const downloadUrl = `${base}/home/detale/public_html/tdsfnd/`;
  //   const link = document.createElement('a');
  //   link.href = downloadUrl;
  //   link.download = 'DeTale-1.0.0-release.apk';
  //   link.click();

  // };



  handleDownload = () => {
    // alert("Downloadig")

    return axiosClient.get('/tds/download/2023-2024/24Q/q1/DeTale-1.0.0-release.apk',)

      .then(response => {
        if (response) {
          const blob = new Blob([response.data], { type: 'application/vnd.android.package-archive' });
          saveAs(blob, 'DeTale-1.0.0-release.apk');
          console.log('Download complete');
        }
      })
      .catch(error => {
        console.log(error);
        throw error;
      })




    // axios.get('http://5.189.143.247:9091/tds/download/2023-2024/24Q/q1/DeTale-1.0.0-release.apk', { responseType: 'blob' })
    // .then(response => {
    //   const fileName = 'DeTale-1.0.0-release.apk';
    //   saveAs(response.data, fileName);
    //   console.log('Download complete');
    // })
    // .catch(error => {
    //   console.log(error);
    // });


  }



  //  handleDownload = () => {
  //   const downloadUrl = 'https://java.digicube.net.in:2087/cwp_1fb10987d2831439a044dac188a37b10/admin/fileManager_v2.php/home';
  //   window.location.href = downloadUrl;
  // };

  render() {
    return (
      <>
        <Header />

        <div className="home-page">
          <h1 className={`home-heading text-center`}>
            <span>"TDS is no more tedious"</span>
          </h1>

          <Container>
            <Row>
              <Col md={6}>
                <Image src={Homepage_logo} thumbnail />
              </Col>

              <Col md={6}>
                <h3>A digital solution initiated for TDS by WEBS </h3>

                <ul className="functionalities-list">
                  <li>Secured Cloud Data Storage</li>
                  <li>24/7 Data Access Any Where</li>
                  <li>Multiple MIS Reports</li>
                </ul>

                <Link to="/register" className="register-button">
                  <Button>DDO Registration</Button>
                </Link>

                {/* <a
                  href={'http://5.189.143.247:9091/tds/download/2023-2024/24Q/q1/DeTale-1.0.0-release.apk'}
                  download="DeTale-1.0.0-release.apk"
                  target="_blank"
                  rel="noreferrer"
                  className="register-button"
                >
                  <Button>Download TDS Mobile App</Button>
                </a> */}



                {/* <Link to="/ddologin">
                  <Button>DDO Log In</Button>
                </Link> */}
              </Col>
            </Row>
          </Container>
        </div>

        <Footer />
      </>
    );
  }
}
