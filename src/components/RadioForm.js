import React, { useRef, useEffect, useState, Component } from "react";
import * as ReactDOM from "react-dom";
import {
  Navbar,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  Card,
  CardColumns,
  Form,
  Alert,
  Radio,
} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import { useFormik, Formik } from "formik";
import * as yup from "yup";
import * as EmailValidator from "email-validator";

const RadioForm = (props) => {
  const history = useHistory();

  const [emailValue, setEmailValue] = useState("");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [boxOneSelect, setBoxOneSelect] = useState(true);
  const [boxTwoSelect, setBoxTwoSelect] = useState(true);
  const [boxThreeSelect, setBoxThreeSelect] = useState(true);
  const [boxFourSelect, setBoxFourSelect] = useState(true);
  const [boxFiveSelect, setBoxFiveSelect] = useState(true);
  const [boxSixSelect, setBoxSixSelect] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [zipcode, setZipcode] = useState("");
  const [downloadLinksError, setDownloadLinksError] = useState(false);
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [incorrectCaptcha, setIncorrectCaptcha] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const schema = yup.object({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    zip: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Must be exactly 5 digits")
      .max(5, "Must be exactly 5 digits"),
    terms: yup.bool().oneOf([true], "Please accept terms"),
  });

  // A custom validation function. This must return an object
  // which keys are symmetrical to our values/initialValues
  const validate = (values) => {
    console.log("values", values);
    if (downloadLinks.length < 1) {
      setDownloadLinksError(true);
    }

    if (!captchaValue) {
      setIncorrectCaptcha(true);
    }

    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    } else if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const [captchaValue, setCaptchaValue] = useState("");
  const submitFormSubmission = async (event) => {
    event.preventDefault();
    console.log("submitting form values..", event);
  };

  const emailRegex = new RegExp(/\S+@\S+\.\S+/);
  const emailValidator = (value) =>
    emailRegex.test(value) ? "" : "Please enter a valid email.";
  const zipCodeValidator = (value) =>
    zipCodeTest(value) ? "" : "Please enter a valid 5 digit zip code.";

  const zipCodeTest = (value) => {
    console.log("zipCodeTest", value);
    if (value == undefined) {
      return false;
    }
    if (value.length != 5) {
      return false;
    } else {
      return true;
    }
  };
  const firstNameValidator = (value) =>
    nameTest(value) ? "" : "Please enter your first name.";
  const lastNameValidator = (value) =>
    nameTest(value) ? "" : "Please enter your last name.";
  const nameTest = (value) => {
    if (value) {
      return true;
    } else {
      return false;
    }
  };

  const onCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    if (value) {
      setCaptchaValue(value);
      setIncorrectCaptcha(false);
    } else {
      setCaptchaValue("");
    }
  };

  const emailChange = (event) => {
    console.log("email change", event.target.value);
    setEmailValue(event.target.value);
  };

  const firstNameChange = (event) => {
    console.log("firstNameChange", event.target.value);
    setFirstName(event.target.value);
  };
  const lastNameChange = (event) => {
    console.log("lastNameChange", event.target.value);
    setLastName(event.target.value);
  };

  const zipChange = (event) => {
    console.log("zipChange", event.target.value);
    setZipcode(event.target.value);
  };

  const termsofUseChange = (event) => {
    console.log("termsofUseChange", event.target.checked);

    setTermsOfUse(event.target.checked);
  };

  const hasError = (key) => {
    console.log("errors", errors);
    console.log("key", key);

    return errors.indexOf(key) !== -1;
  };

  const handleInputChange = (event) => {
    var key = event.target.name;
    var value = event.target.value;
    var obj = {};
    obj[key] = value;
  };

  const submitData = async (payload) => {
    console.log("payload", payload);
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/https://www.bshpersona.com/personaAPI/data/LeadAPISubmitData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) {
            console.log("result returned", result);
            //redirect

            history.push({
              pathname: "/confirmation",
              state: { links: downloadLinks },
            });
          }
        },

        (error) => {
          console.log("errr", error);

          setErrorMessage(error.toString());
        }
      )
      .catch((error1) => console.log("error1", error1));
  };

  const selectCard = (param) => {
    if (param == 1) {
      setBoxOneSelect(!boxOneSelect);

      if (boxOneSelect) {
        setDownloadLinks(downloadLinks.concat(1));
      } else {
        removeItem(1);
      }
    }
    if (param == 2) {
      setBoxTwoSelect(!boxTwoSelect);
      if (boxTwoSelect) {
        setDownloadLinks(downloadLinks.concat(2));
      } else {
        removeItem(2);
      }
    }
    if (param == 3) {
      setBoxThreeSelect(!boxThreeSelect);
      if (boxThreeSelect) {
        setDownloadLinks(downloadLinks.concat(3));
      } else {
        removeItem(3);
      }
    }
    if (param == 4) {
      setBoxFourSelect(!boxFourSelect);
      if (boxFourSelect) {
        setDownloadLinks(downloadLinks.concat(4));
      } else {
        removeItem(4);
      }
    }
    if (param == 5) {
      setBoxFiveSelect(!boxFiveSelect);
      if (boxFiveSelect) {
        setDownloadLinks(downloadLinks.concat(5));
      } else {
        removeItem(5);
      }
    }
    if (param == 6) {
      setBoxSixSelect(!boxSixSelect);
      if (boxSixSelect) {
        setDownloadLinks(downloadLinks.concat(6));
      } else {
        removeItem(6);
      }
    }

    if (downloadLinks.length < 1) {
      setDownloadLinksError(false);
    }
    console.log("downloadLinks", downloadLinks);
    // setDownloadLinks(downloadLinkObj);
  };

  const removeItem = (e) => {
    var array = [...downloadLinks];
    var index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      setDownloadLinks(array);
    }
  };

  const handleChange = async () => {
    console.log("handlechange test");
  };
  const handleSubmit = async (dataItem) => {
    console.log("dataItem", dataItem);
    if (captchaValue) {
      setIsLoading(true);
      var payloadObj = {
        promoIDExt: "10A129D3-F78B-4E1B-9C21-B65353B9E456",
        firstName: dataItem.firstName,
        lastName: dataItem.lastName,
        email: dataItem.email,
        zipCode: dataItem.zip,
      };

      await submitData(payloadObj);
    } else {
      setIncorrectCaptcha(true);
    }

    setIsLoading(false);
  };

  const ShowLoadText = () => {
    if (isLoading) {
      return "Loading...";
    } else {
      return "Submit";
    }
  };

  return (
    <>
      <Container
        style={{ paddingTop: "60px", minHeight: "2000px", padding: "50px" }}
      >
        <Row>
          {errorMessage ? (
            <Alert style={{ minWidth: "100%" }} variant='danger'>
              {errorMessage}
            </Alert>
          ) : null}
          <h2>Cleaning</h2>

          <Form>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as='legend' column sm={2}>
                  Does the glass cooktop appear easier to clean without the
                  knobs?*
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type='radio'
                    label='Yes'
                    name='formHorizontalRadios'
                    id='formHorizontalRadios1'
                  />
                  <Form.Check
                    type='radio'
                    label='No'
                    name='formHorizontalRadios'
                    id='formHorizontalRadios2'
                  />
                  <Form.Check
                    type='radio'
                    label='Not Sure'
                    name='formHorizontalRadios'
                    id='formHorizontalRadios3'
                  />
                </Col>
              </Form.Group>
            </fieldset>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type='submit'>Submit</Button>
              </Col>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default RadioForm;
