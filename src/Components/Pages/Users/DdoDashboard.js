import React, { Component } from 'react';

import Header from '../../Common/Header';
import Footer from '../../Common/Footer';
import Sidebar from '../../Common/Sidebar';
import Activebar from '../../Common/Activebar';
import {  Form } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getDeductorInfo, sendGreetingMessage } from '../../../api';

export default class DdoDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      userPan: '',
      userTan: '',
      visible: false
    }
  }

  componentDidMount() {

    const userPan = sessionStorage.getItem("userPan");


    getDeductorInfo(userPan).then(res => {
      console.log(res)
      const deductorDataFromRes = res.ddoPan
      const deductorDataFromRes1 = res.tanNumber

      this.setState({ userPan: deductorDataFromRes })
      this.setState({ userTan: deductorDataFromRes1 })


    })
  }
  handleChange1 = (e) => {
    this.setState({ message: e.target.value });

  }

  handleSubmit = () => {
    this.setState({ visible: true })
    // "ddoMessage" : "Thank you DCP for the approval of this project",
    // "ddoPan": "ABCD",
    // "ddoTan": "ABX"
    const body = {
      ddoMessage: this.state.message,
      ddoPan: this.state.userPan,
      ddoTan: this.state.userTan,

    }
    console.log(body)


    sendGreetingMessage(JSON.stringify(body)).then(res => {
      // this.setState({ uploadError: false });
      // this.setState({ successMessage: res.message });
      toast.success(res.message);

      // toast.success(`${this.state.userInfo} Says ${this.state.message} to You`);


    });
    this.setState({ message: '' });



  }

  render() {
    return (
      <>
        <Header />

        <Activebar />

        <div className="leftbox">
          <Sidebar />
        </div>

        <div className="middlebox">
          <div className='wrapper'>
            <div className='box'>
              <Form>
                <h2 style={{ color: '#364760' }}>
                  Say Your Greetings !!!<span className="Mandatory_Staff"></span>
                </h2>
                <Form.Control
                  type="text"
                  value={this.state.message}
                  onChange={this.handleChange1}
                  className="dropdown-basic"
                  placeholder="Enter Your Wishes"
                  name="user_Id"
                  required
                />
              </Form>
            </div>
          </div>
          <div style={{ margin: 20 }}>

            <Button
              className={`upload-btn small-btn`}
              onClick={this.handleSubmit}>
              SAVE
            </Button >
          </div>        
        </div>
        <div style={{ clear: "both" }}></div>
        <Footer />
      </>
    )
  }
}
