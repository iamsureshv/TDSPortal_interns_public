import React, { Component } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import "./DdoLogin.css";
import "../../Common/Calendar.css";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import { login } from '../../../api';

export default class DdoMobileLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: React,
      email: "",
      password: "",
    };
  }

  handleChangeUsername = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  componentDidMount() {
    this.props.history.push("/ddoMobilelogin");
  }


  register = () => {
    this.props.history.push("/mobileRegistration");


  }


  login = () => {
    let loginData = {
      "username": this.state.email,
      "password": this.state.password,
      // "username" : "ABAPI9440D",
      // "password" : "ABAPI9440D@1",
      "isMobile": true
    };






    login(loginData).then(res => {
      if (res && res.token) {
        console.log(res)

        //         ddoMessage: "Thank you DCP for the approval of this project1"
        // ddoPan: "AEHPJ3830J"
        // dedcutorName: "Jayendra Viswanathan M"
        // email: "mdaftabalam196@gmail.com"
        // employerTan: "BLRM05590E"
        // roles: ['Customer']
        // token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtZGFmdGFiYWxhbTE5NkBnbWFpbC5jb206dHJ1ZSIsImlhdCI6MTY4ODM3ODQ3MCwiZXhwIjoxNjg4MzgyMDcwfQ.Nj97KGKHW2ADv4SIWa1l9F_ZeqMsOrUa7Atgfc2g0B97kRdiJLQ4JxgWdKEfn1wDLSXk6d018WuC7UklTq1bTw"
        // type: "Bearer"
        // userLogin: "AEHPJ3830J"
        // username: "AEHPJ3830J"

        // sessionStorage.setItem("companyName", res.companyName);
        sessionStorage.setItem("userPan", res.ddoPan);
        sessionStorage.setItem("userLogin", res.ddoPan);
        sessionStorage.setItem("username", res.username);
        sessionStorage.setItem("message", res.ddoMessage);
        sessionStorage.setItem("user-email", res.email);
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("user-tan", res.employerTan);
        sessionStorage.setItem("deductorName", res.dedcutorName);
        this.props.history.push("/ddoMobileProfile");
      } else {
        this.props.history.push("/ddoMobilelogin");
      }
    });
  };
  render() {
    return (
      <>
        <Header />

        <div>
          <span className="notification">
            {/* <u>NOTIFICATION: Last Day for Task Submission is 18/06/2021</u> */}
          </span>

          <div className="login-container row">
            <div className="login-window col-md-3">
              <div className="login_head">
                <h2>Mobile User login</h2>
              </div>

              <div className="login_body">
                <Form>
                  <Form.Label className="label-user-id">
                    Pan Number&nbsp;<span className="mandatory">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="AAACI5145D"
                    className="input-box"
                    value={this.state.email}
                    onChange={this.handleChangeUsername}
                    name="user_Id"
                    required
                  />

                  <Form.Label className="label-password">
                    Password&nbsp;<span className="Mandatory">*</span>
                  </Form.Label>

                  <Form.Control
                    type="password"
                    className="input-box"
                    placeholder="* * * * * * * *"
                    name="user_Id"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    required
                  />

                  <Form.Text className="forgot_password">
                    <div onClick={this.register}>
                    <Link>
                      <u 
                      >Mobile Registration</u>
                    </Link>

                    </div>
                   
                  </Form.Text>

                  <Link to="DdoDashboard">
                    <Button
                      className="login-button"
                      type="submit"
                      onClick={this.login}
                    >
                      Login
                    </Button>
                  </Link>
                </Form>


              </div>
            </div>

            <div className="login-calendar col-md-3">
              <Calendar />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
