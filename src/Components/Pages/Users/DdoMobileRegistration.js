

import { Link } from "react-router-dom";

import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify';

import "./Register.css";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";

import { mobileRegister } from "../../../api/authApi";

const DdoMobileRegistration = () => {

  const messages = {
    email: "Incorrect email",
    mobile: "Incorrect mobile number",
    required: "This field is required",
    ddoPanNumber: "Incorrect DDO pan number",

  };

  const history = useHistory();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState()


  const resetForm = () => {
    window.location.reload(false);

    setForm({}); // Clear the form by setting an empty object
    setErrors({}); // Clear any error messages
  };

  const handleChange = (event) => {
    console.log(event.target.value)
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

    if (!!errors[event.target.name]) {
      setErrors({
        ...errors,
        [event.target.name]: null
      });
    }
  };
  const goToLogin = () => {
    history.push("/ddoMobilelogin");
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)

    const newErrors = validateForm(e.currentTarget);
    if (Object.keys(newErrors).length > 0) {
      toast.error('There is an error in the registration form. Please check before submitting')
      setErrors(newErrors);
    } else {
      mobileRegister(form).then(res => {
        if (res && res.status && res.status === 'Success') {
          console.log(res)
          setSuccessMessage(res.message)
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'custom-toast', // Use a custom CSS class for styling (optional)
          });
          // window.location.reload(false);

        } else {
          history.push({ pathname: '/mobileRegistration' });
        }
      });
    }
  };

  const validateForm = (formEl) => {
    // const isNumRegex = /^\d+$/;
    const newErrors = {};

    let requiredFields = [];
    Array.from(formEl.elements).forEach(el => {
      if (el.hasAttribute('required')) {
        requiredFields.push(el.name);
      }
    });
    requiredFields = [...new Set(requiredFields)];

    requiredFields.forEach(field => {
      if (!form[field] || !form[field].trim()) {
        newErrors[field] = messages.required;
      }
    });



    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // if (!reg.test(form.email) === true) {
    //   newErrors.email = messages.email;
    // }

    if (form.mobile.length < 10) {
      newErrors.mobile = messages.mobile;

    }

    if (form.pan && form.pan.length !== 10) {
      newErrors.pan = messages.pan;
    }
    return newErrors;
  }



  return (
    <>
      <Header />

      <div>

        <div className="login-container row">
          <div className="login-window col-md-3">
            <div className="login_head">
              <h2>Mobile User Registration</h2>
            </div>

            <div className="login_body">


              <Form onSubmit={handleSubmit} noValidate>



                <Form.Group as={Col} md="12">
                  <Form.Label htmlFor="pan">
                    PAN Number{" "}
                    <span className="label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="pan"
                    onChange={handleChange}
                    name="pan"
                    placeholder="10 digit PAN number"
                    isInvalid={!!errors.pan}
                  />
                  <Form.Text>Ex: AZFRG4567N, Last character except 0</Form.Text>
                  <Form.Control.Feedback type='invalid'>{errors.pan}</Form.Control.Feedback>
                </Form.Group>



                <Form.Group as={Col} md="12">
                  <Form.Label htmlFor="email">
                    E-mail{" "}
                    <span className="label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="email"
                    id="email"
                    onChange={handleChange}
                    name="email"
                    placeholder="abc@gmail.com"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12">
                  <Form.Label htmlFor="mobile">
                    Mobile No.{" "}
                    <span className="label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="mobile"
                    maxLength={10} onChange={handleChange}
                    name="mobile"
                    placeholder="1234567890"
                    isInvalid={!!errors.mobile}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.mobile}</Form.Control.Feedback>
                </Form.Group>



                <div className="button-container">
                  <Button id="btn-reg-submit" type="submit">
                    Register
                  </Button>
                  <Button
                    id="btn--reg-reset"
                    className="button-2"
                    onClick={resetForm}
                    variant="secondary"
                  >
                    Reset
                  </Button>
                </div>


                {successMessage &&
                  <Form.Text className="forgot_password">
                    <div style={{ marginTop: 20 }}>

                      {successMessage} Please
                      <Link onClick={goToLogin}>
                        <u style={{ marginLeft: 5 }}
                        >Login </u>
                      </Link>

                    </div>

                  </Form.Text>
                }

              </Form>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default DdoMobileRegistration;

