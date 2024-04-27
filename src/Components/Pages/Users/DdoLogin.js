import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Calendar from "react-calendar";
import "./DdoLogin.css";
import "../../Common/Calendar.css";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import { login } from '../../../api';

export default class DdoLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: null,
      passwordError: null,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateEmail = () => {
    const { email } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.setState({ emailError: "Invalid email address" });
      return false;
    }
    this.setState({ emailError: null });
    return true;
  };

  validatePassword = () => {
    const { password } = this.state;
    if (password.length < 6) {
      this.setState({ passwordError: "Password must be at least 6 characters long" });
      return false;
    }
    this.setState({ passwordError: null });
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateEmail() && this.validatePassword()) {
      // If email and password are valid, proceed with login
      this.login();
    }
  };

  login = () => {
    const { email, password } = this.state;
    const loginData = {
      username: email,
      password: password,
    };

    login(loginData).then(res => {
      if (res && res.token) {
        sessionStorage.setItem("userPan", res.ddoPan);
        sessionStorage.setItem("user-email", res.email);
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("user-tan", res.employerTan);
        sessionStorage.setItem("deductorName", res.dedcutorName);
        this.props.history.push("/DdoDashboard");
      } else {
        this.props.history.push("/DdoLogin");
      }
    });
  };

  render() {
    const { email, password, emailError, passwordError } = this.state;
    return (
      <>
        <Header />
        <div>
          <span className="notification"></span>
          <div className="login-container row">
            <div className="login-window col-md-3">
              <div className="login_head">
                <h2>DDO login</h2>
              </div>
              <div className="login_body">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Label className="label-user-id">
                    User Id <span className="mandatory">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="example@example.com"
                    className="input-box"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    required
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                  <Form.Label className="label-password">
                    Password <span className="Mandatory">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    className="input-box"
                    placeholder="********"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    required
                  />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                  <Form.Text className="forgot_password">
                    <div>
                      <Link to="register">
                        <u>Registration</u>
                      </Link>
                    </div>
                  </Form.Text>
                  <Button className="login-button" type="submit">
                    Login
                  </Button>
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
