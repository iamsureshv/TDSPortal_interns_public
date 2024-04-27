import React, { Component } from "react";
 import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./Staff_Login.css";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import { login } from '../../../api';
import { USER_ROLES } from '../../../shared/constants';

export default class StaffLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: React,
      Login_Super_Window: true,
      Login_Manager_Window: false,
      Login_Backend_Window: false,
      Login_Backend_Admin_Window: false,
      showComponent: false,
      bgColor1: "#2b3a51",
      bgColor2: "#eef1fa",
      bgColor3: "#eef1fa",
      bgColor4: "#eef1fa",
      color1: "#eef1fa",
      color2: "#2b3a51",
      color3: "#2b3a51",
      color4: "#2b3a51",
      email: "",
      password: "",
      userType: "SUPER_USER",
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.login = this.login.bind(this);
  }

  Toggle_Super_page = () => {
    this.setState({
      Login_Super_Window: true,
      Login_Manager_Window: false,
      Login_Backend_Window: false,
      Login_Backend_Admin_Window: false,
      bgColor1: "#2b3a51",
      bgColor2: "#eef1fa",
      bgColor3: "#eef1fa",
      bgColor4: "#eef1fa",
      color1: "#eef1fa",
      color2: "#2b3a51",
      color3: "#2b3a51",
      color4: "#2b3a51",
    });
  };

  Toggle_Manager_Window = () => {
    this.setState({
      Login_Super_Window: false,
      Login_Manager_Window: true,
      Login_Backend_Window: false,
      Login_Backend_Admin_Window: false,
      bgColor2: "#2b3a51",
      bgColor1: "#eef1fa",
      bgColor3: "#eef1fa",
      bgColor4: "#eef1fa",
      color2: "#eef1fa",
      color1: "#2b3a51",
      color3: "#2b3a51",
      color4: "#2b3a51",
    });
  };

  Toggle_Backend_Window = () => {
    this.setState({
      Login_Super_Window: false,
      Login_Manager_Window: false,
      Login_Backend_Window: true,
      Login_Backend_Admin_Window: false,
      bgColor3: "#2b3a51",
      bgColor2: "#eef1fa",
      bgColor1: "#eef1fa",
      bgColor4: "#eef1fa",
      color3: "#eef1fa",
      color2: "#2b3a51",
      color1: "#2b3a51",
      color4: "#2b3a51",
    });
  };

  Toggle_Backend_Admin_Window = () => {
    this.setState({
      Login_Super_Window: false,
      Login_Manager_Window: false,
      Login_Backend_Window: false,
      Login_Backend_Admin_Window: true,
      bgColor4: "#2b3a51",
      bgColor2: "#eef1fa",
      bgColor3: "#eef1fa",
      bgColor1: "#eef1fa",
      color4: "#eef1fa",
      color2: "#2b3a51",
      color3: "#2b3a51",
      color1: "#2b3a51",
    });
  };

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  login() {
    let loginData = {
      username: this.state.email,
      password: this.state.password,
    };

    login(loginData).then(res => {
      if (res && res.token && res.roles && res.roles.length) {
        const isAdmin = res.roles.find(role => role.toLowerCase() === USER_ROLES.SUPERADMIN);
        if (isAdmin) {
          sessionStorage.setItem("user-email", res.email);
          sessionStorage.setItem("token", res.token);
          sessionStorage.setItem("deductorName", res.dedcutorName);
          this.props.history.push("/Dashboard");
        }
      } else {
        this.props.history.push("/StaffLogin");
      }
    });
  }

  render() {
    return (
      <>
        <Header />
        <span className="notification">
          <u>NOTIFICATION: Last Day for Task Submission is 18/06/2021</u>
        </span>

        <div className="Login_Component_Staff">
          <div className="Super_Window">
            <div className="Staff_Login_text">Admin login</div>

            <div className="Staff_Login_body">
              <Form>
                <Form.Label className="Labels_User_id_Staff">
                  User Id&nbsp;<span className="Mandatory_Staff">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                  className="text_box_Staff"
                  placeholder="Jhon Doe"
                  name="user_Id"
                  required
                />

                <Form.Label className="Labels_password_Staff">
                  Password&nbsp;<span className="Mandatory_Staff">*</span>
                </Form.Label>

                <Form.Control
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                  className="password_box_Staff"
                  placeholder="* * * * * * * *"
                  name="user_Id"
                  required
                />

                <Form.Text className="forgot_password_Staff">
                  <u>Forgot Password?</u>
                </Form.Text>

                <div>
                  <Button className="Login_Button_Staff" onClick={this.login}>
                    Login
                  </Button>
                </div>
              </Form>
              <br />
              {/* <span className="dot_Staff"></span> */}
              {/* <p className="Active_Staff">Active Users:232</p> */}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
