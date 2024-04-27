import React, { Component } from "react";
import { Table, Spinner } from "react-bootstrap";

import "./DeductorInfo.css";
import Header from "../../Common/Header";
import Activebar from "../../Common/Activebar";
import Sidebar from "../../Common/Sidebar";
import Footer from "../../Common/Footer";
import { getDeductorInfo } from '../../../api';

class DeductorInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deductorData: [],
      ddoData: [],
      companyName: null,
      loading: true
    };
  }

  componentDidMount() {
    const deductorName = sessionStorage.getItem("userPan");

    getDeductorInfo(deductorName).then(res => {
      console.log(res)
      const deductorDataFromRes = [
        {"Name of the Deductor": res.companyName},
        {"Tax Deduction Account Number": res.tanNumber},
        {"Permanent Account Number": res.panNumber},
        {"Deductor Category": res.category},
        {"Company Email ID": res.emailId},
        {"STD Code": res.stdCode},
        {"Telephone No": res.landLineNumber},
        {"Mobile No": res.mobile},
        {"Flat/Door/Block No": res.address1},
        {"Name of Premises/Building": res.premisesName},
        {"Area/Locality": res.area},
        {"Town/District/City": res.city},
        {"State": res.state},
        {"PIN Code": res.pinCode}
      ];

      const ddoDataFromRes = [
        {"Name Of the DDO": res.ddoName},
        {"Designation of DDO": res.designation},
        {"PAN of DDO": res.ddoPan},
        // {"Designation of the DDO": null},
      ]

      this.setState({
        deductorData: deductorDataFromRes,
        ddoData: ddoDataFromRes,
        companyName: res.companyName,
        loading: false
      });
    })
    .catch((err) => {
      console.log(err);
      this.setState({ loading: false });
    });
  }

  generateElement = (obj, i) => {
    const objKeys = Object.keys(obj);
    return (
      <tr key={i}>
        <td>{objKeys[0]}</td>
        <td>{obj[objKeys[0]]}</td>
      </tr>
    );
  };

  render() {
    return (
      <div>
        <Header />
        <Activebar />

        <div className="leftbox">
          <Sidebar />
        </div>

        <div className="middlebox">
          {this.state.loading ? (
            <div className="loader-container">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            this.state.deductorData.length ? (
              <>
                <div className="deductorinfo-table">
                  <Table striped bordered hover style={{ 'width': '60%' }}>
                    <thead>
                      <tr><th>{this.state.companyName}</th><th></th><th></th></tr>
                    </thead>
                    <tbody>
                      {this.state.deductorData.map((item, i) => this.generateElement(item, i))}
                    </tbody>
                  </Table>
                </div>

                <div className="deductorinfo-table">
                  <Table striped bordered hover style={{ 'width': '60%' }}>
                    <thead>
                      <tr><th>DDO/Responsible Person Info</th><th></th></tr>
                    </thead>
                    <tbody>
                      {this.state.ddoData.map(item => this.generateElement(item))}
                    </tbody>
                  </Table>
                </div>
              </>
            ) : (<h5>No deductor data found</h5>)
          )}
        </div>

        <div style={{ clear: "both" }}></div>

        <Footer />
      </div>
    );
  }
}

export default DeductorInfo;
