import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify';

import "./Register.css";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";

import { register } from "../../../api/authApi";

const Register = () => {

  const messages = {
    tanNumber: "Incorrect TAN number",
    companyPanNumber: "Incorrect PAN number",
    category: "Company category not selected",
    companyName: "Company name is too short",
    stdCode: "Incorrect STD code",
    landLineNumber: "Incorrect landline number",
    pinCode: "Incorrect pincode",
    emailId: "Incorrect email",
    mobile: "Incorrect mobile number",
    required: "This field is required",
    ddoPanNumber: "Incorrect DDO pan number",

  };

  const history = useHistory();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const resetFrom = () => {
    console.log('reset form');
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e)
    console.log(form)

    // TODO: change to sending form(e.currentTarget) from here. we can remove handleChange and changing state
    const newErrors = validateForm(e.currentTarget);
    if (Object.keys(newErrors).length > 0) {
      toast.error('There is an error in the registration form. Please check before submitting')
      setErrors(newErrors);
    } else {

      console.log(form)

      register(form).then((res) => {
        if (res && res.status && res.status === 'Success') {
          toast.success(res.data);
          history.push({ pathname: '/' });
        }
      });
    }
  };

  const validateForm = (formEl) => {
    const isNumRegex = /^\d+$/;
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

    if (form.tanNumber && form.tanNumber.length !== 10) {
      newErrors.tanNumber = messages.tanNumber;
    }
    if (form.ddoPanNumber && form.ddoPanNumber.length !== 10) {
      newErrors.ddoPanNumber = messages.ddoPanNumber;
    }

    if (form.companyPanNumber && form.companyPanNumber.length !== 10) {
      newErrors.companyPanNumber = messages.companyPanNumber;
    }

    if (form.companyName && form.companyName.length < 3) {
      newErrors.companyName = messages.companyName;
    }

    if (form.stdCode && (form.stdCode.length < 3 || !isNumRegex.test(form.stdCode))) {
      newErrors.stdCode = messages.stdCode;
    }

    if (form.landLineNumber && (form.landLineNumber.length !== 8 || !isNumRegex.test(form.landLineNumber))) {
      newErrors.landLineNumber = messages.landLineNumber;
    }

    if (form.pinCode && (form.pinCode.length !== 6 || !isNumRegex.test(form.pinCode))) {
      newErrors.pinCode = messages.pinCode;
    }


    return newErrors;
  }

  return (
    <>
      <Header />

      <div className="form_container">
        <div className="form_header">
          Register New deductor/DDO (All fields are mandatory)
        </div>

        <Form onSubmit={handleSubmit} noValidate>
          <div className="form_section">
            <div className="form_section_header">Company Details</div>

            <Row className="form_group_section">
              <Form.Group as={Col} md="6">
                <Form.Label htmlFor="tanNumber">
                  TAN of the company/office{" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="tanNumber"
                  onChange={handleChange}
                  name="tanNumber"
                  placeholder="10 Digit TAN number"
                  isInvalid={!!errors.tanNumber}
                />
                <Form.Text>Ex: BLRO12345A, Last character except 0</Form.Text>
                <Form.Control.Feedback type='invalid'>{errors.tanNumber}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label htmlFor="companyPanNumber">
                  PAN of the company/office{" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="companyPanNumber"
                  onChange={handleChange}
                  name="companyPanNumber"
                  placeholder="10 digit PAN number"
                  isInvalid={!!errors.companyPanNumber}
                />
                <Form.Text>Ex: AZFRG4567N, Last character except 0</Form.Text>
                <Form.Control.Feedback type='invalid'>{errors.companyPanNumber}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="form_group_section">
        <Form.Group as={Col} md="4">
          <Form.Label htmlFor="premisesName">
            Category <span className="label-required">*</span>
          </Form.Label>
          <div className="radio_group">
            <Form.Check
              required
              type="radio"
              id="category-government"
              label="Government"
              value="Government"
              onChange={handleChange}
              name="category"
              inline
              isInvalid={!!errors.category}
            />
            <Form.Check
              required
              type="radio"
              id="category-non-government"
              label="Non-Government"
              value="Non-Government"
              onChange={handleChange}
              name="category"
              inline
              isInvalid={!!errors.category}
            />
          </div>
          <Form.Control.Feedback type='invalid'>{errors.category}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      
            <Row className="form_group_section">
              <Form.Group as={Col} md="4">
                <Form.Label htmlFor="companyName">
                  Company/office name{" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="companyName"
                  onChange={handleChange}
                  
                  name="companyName"
                  placeholder="Company name"
                  isInvalid={!!errors.companyName}
                />
                <Form.Control.Feedback type='invalid'>{errors.companyName}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label htmlFor="premisesName">
                  Name of premises{" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="premisesName"
                  onChange={handleChange}
                  name="premisesName"
                  placeholder="Premises name"
                  isInvalid={!!errors.premisesName}
                />
                <Form.Control.Feedback type='invalid'>{errors.premisesName}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label htmlFor="landLineNumber">
                  Landline No(with STD){" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    required
                    className="form_std_code"
                    type="text"
                    id="stdCode"
                    onChange={handleChange}
                    name="stdCode"
                    placeholder="080"
                    isInvalid={!!errors.stdCode}
                  />
                  <Form.Control
                    required
                    className="form_landline"
                    type="text"
                    id="landLineNumber"
                    onChange={handleChange}
                    name="landLineNumber"
                    placeholder="12345678"
                    isInvalid={!!errors.landLineNumber}
                  />
                </InputGroup>
                <Form.Control.Feedback type='invalid'>{errors.stdCode}</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>{errors.landLineNumber}</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </div>

          <div className="form_section">
            <div className="form_section_header">Address Details</div>

            <Row className="form_group_section">
              <Form.Group as={Col} md="4">
                <Form.Label htmlFor="address1">
                  Address 1{" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="address1"
                  onChange={handleChange}
                  name="address1"
                  placeholder="Address 1"
                  isInvalid={!!errors.address1}
                />
                <Form.Control.Feedback type='invalid'>{errors.address1}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label htmlFor="address2">Address 2</Form.Label>
                <Form.Control
                  className="prevent-validation"
                  type="text"
                  id="address2"
                  onChange={handleChange}
                  name="address2"
                  placeholder="Address 2"
                />
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label htmlFor="address3">Address 3</Form.Label>
                <Form.Control
                  className="prevent-validation"
                  type="text"
                  id="address3"
                  onChange={handleChange}
                  name="address3"
                  placeholder="Address 3"
                />
              </Form.Group>
            </Row>

            <Row className="form_group_section">
              <Form.Group as={Col} md="4">
                <Form.Label htmlFor="area">
                  Area{" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="area"
                  onChange={handleChange}
                  name="area"
                  placeholder="Area"
                  isInvalid={!!errors.area}
                />
                <Form.Control.Feedback type='invalid'>{errors.area}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label htmlFor="city">
                  City{" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="city"
                  onChange={handleChange}
                  name="city"
                  placeholder="City"
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type='invalid'>{errors.city}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label htmlFor="state">
                  State{" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="state"
                  onChange={handleChange}
                  name="state"
                  placeholder="State"
                  isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type='invalid'>{errors.state}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="form_group_section">
              <Form.Group as={Col} md="4">
                <Form.Label htmlFor="country">
                  Country{" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="country"
                  onChange={handleChange}
                  name="country"
                  placeholder="country"
                  isInvalid={!!errors.country}
                />
                <Form.Control.Feedback type='invalid'>{errors.country}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label htmlFor="pinCode">
                  Pincode{" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="pinCode"
                  onChange={handleChange}
                  name="pinCode"
                  placeholder="PINCODE"
                  isInvalid={!!errors.pinCode}
                />
                <Form.Control.Feedback type='invalid'>{errors.pinCode}</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </div>

          <div className="form_section">
            <div className="form_section_header">Contact Details</div>

            <Row className="form_group_section">
              <Form.Group as={Col} md="6">
                <Form.Label htmlFor="resPersonName">
                  Name of person responsible (DDO){" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="resPersonName"
                  onChange={handleChange}
                  name="resPersonName"
                  placeholder="Name of person responsible"
                  isInvalid={!!errors.resPersonName}
                />
                <Form.Control.Feedback type='invalid'>{errors.resPersonName}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label htmlFor="emailId">
                  E-mail{" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="email"
                  id="emailId"
                  onChange={handleChange}
                  name="emailId"
                  placeholder="abc@gmail.com"
                  isInvalid={!!errors.emailId}
                />
                <Form.Control.Feedback type='invalid'>{errors.emailId}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="form_group_section">
              <Form.Group as={Col} md="6">
                <Form.Label htmlFor="mobile">
                  Mobile No.{" "}
                  <span className="label-required">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="mobile"
                  onChange={handleChange}
                  name="mobile"
                  placeholder="1234567890"
                  isInvalid={!!errors.mobile}
                />
                <Form.Control.Feedback type='invalid'>{errors.mobile}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label htmlFor="ddoPanNumber">
                  PAN of DDO
                  <span className="label-required">*</span>


                </Form.Label>
                <Form.Control
                  className="prevent-validation"
                  required
                  type="text"
                  id="ddoPanNumber"
                  onChange={handleChange}
                  name="ddoPanNumber"
                  placeholder="PAN of the DDO"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6">
                <Form.Label htmlFor="designation">
                  Designation of the DDO
                </Form.Label>
                <Form.Control
                  className="prevent-validation"
                  type="text"
                  id="designation"
                  onChange={handleChange}
                  name="designation"
                  placeholder="Enter Designation of the DDO"
                />
              </Form.Group>
              {/* <Form.Group as={Col} md="6">
                <Form.Label htmlFor="remark">
                 Additonal DDO
                </Form.Label>
                <Form.Control
                  className="prevent-validation"
                  type="text"
                  id="remark"
                  onChange={handleChange}
                  name="remark"
                  placeholder="Enter Additonal DDO"
                />
              </Form.Group> */}
            </Row>

          </div>


          <div className="button-container">


            <Button id="btn-reg-submit" type="submit">
              Submit Registration
            </Button>
            <Button
              id="btn--reg-reset"
              className="button-2"
              onClick={resetFrom}
              variant="secondary"
            >
              Reset Details
            </Button>
          </div>
        </Form>
      </div>

      <Footer />
    </>
  );
}

export default Register;
