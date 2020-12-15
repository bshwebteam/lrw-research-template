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
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import * as EmailValidator from "email-validator";
var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
defaultThemeColors["$main-color"] = "#00639a";
defaultThemeColors["$main-hover-color"] = "#009bd9";

defaultThemeColors["$header-background-color"] = "#fff";
defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

Survey.StylesManager.applyTheme();
class Introduction extends Component {
  //Define Survey JSON
  //Here is the simplest Survey with one text question
  json = {
    title: "Coffee Machine Survey",

    pages: [
      {
        name: "Page 1: introduction",
        navigationTitle: "Collector",
        navigationDescription: "Collector's info",
        elements: [
          {
            type: "panel",
            elements: [
              {
                type: "image",
                name: "first_page_image",
                imageLink:
                  "https://secure.img1-ag.wfcdn.com/im/32763480/resize-h800-w800%5Ecompr-r85/1111/111124265/Premium+Cappuccino+Semi-Automatic+Espresso+Machine.jpg",
                imageFit: "none",
                imageHeight: 726,
                imageWidth: 500,
                width: "600px",
              },
              {
                type: "radiogroup",
                name: "fully automatic",
                title:
                  "How appealing do you find this type of machine appealing?",
                choices: [
                  "Very appealing",
                  "Somewhat appealing",
                  "Neutral",
                  "Not very appealing",
                  "Not appealing at all",
                ],
              },
            ],
          },

          {
            type: "radiogroup",
            name: "semiautomatic espresso makers",
            title: "How appealing do you find this type of machine?",
            choices: [
              "Very appealing",
              "Somewhat appealing",
              "Neutral",
              "Not very appealing",
              "Not appealing at all",
            ],
          },
          {
            type: "radiogroup",
            name: "model type",
            title: "Which model type do you prefer?",
            choices: [
              "Fully automatic",
              "Portafilter",
              "I don't have a preference",
            ],
          },
          {
            type: "checkbox",
            name: "3 reasons for preference",
            title:
              "Select up to 3 reasons for your preference. (Select all that aply)",
            isRequired: true,
            colCount: 4,
            choices: [
              "Price",
              "Quality",
              "Convenience",
              "Maintenance",
              "Design",
              "Recommendation",
              "Experience/Familiarity",
              "Process of preparation",
              "Consistency of drink quality",
              "Brand",
              "Machine hygiene/cleanliness",
            ],
          },
        ],

        questions: [],
      },
      {
        questions: [
          {
            elements: [
              {
                type: "image",
                name: "seventh_image",
                width: "600",
                imageLink:
                  "https://target.scene7.com/is/image/Target/GUEST_2758701a-9d26-46e8-ad4f-620eb1c1ccb6?wid=325&hei=325&qlt=80&fmt=webp",
                imageHeight: 441,
                imageWidth: 500,
              },
              {
                type: "html",
                name: "info",
                html:
                  '<iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY">',
              },
            ],
          },

          {
            type: "matrix",
            name: "Quality",
            title: "Please rate the following on a scale of 1 to 5",
            columns: [
              {
                value: 1,
                text: "I like it very much",
              },
              {
                value: 2,
                text: "I like it somewhat",
              },
              {
                value: 3,
                text: "Neutral",
              },
              {
                value: 4,
                text: "I don't like it very much",
              },
              {
                value: 5,
                text: "I don't like it at all",
              },
            ],
            rows: [
              {
                value: "affordable",
                text: "Overall look & feel",
              },
              {
                value: "does what it claims",
                text: "Top placement of control panel",
              },
              {
                value: "better then others",
                text: "Look of the buttons",
              },
              {
                value: "easy to use",
                text: "Iconography/graphics",
              },
              {
                value: "easy to use",
                text: "Look of the digital screen",
              },
              {
                value: "easy to use",
                text: "The amont of buttons",
              },
            ],
          },

          {
            type: "rating",
            name: "luxury",
            title: "Please rate the product based on the descriptors below.",
            isRequired: true,

            mininumRateDescription: "Cheap",
            maximumRateDescription: "Luxury",
          },
          {
            type: "rating",
            hideNumber: true,
            name: "modern",
            title: "Please rate the product based on the descriptors below.",
            showQuestionNumbers: "off",
            titleLocation: "hidden",
            isRequired: true,
            mininumRateDescription: "Outdated",
            maximumRateDescription: "Modern",
          },
          {
            type: "rating",
            name: "cuting-edge",
            title: "Please rate the product based on the descriptors below.",
            titleLocation: "hidden",
            hideNumber: true,
            mininumRateDescription: "Plain",
            maximumRateDescription: "Cutting-Edge",
          },
          {
            type: "rating",
            name: "recommend friends",
            visibleIf: "{satisfaction} > 3",
            title:
              "How likely are you to recommend the Product to a friend or co-worker?",
            mininumRateDescription: "Will not recommend",
            maximumRateDescription: "I will recommend",
          },
          {
            type: "comment",
            name: "suggestions",
            title: "What would make you more satisfied with the Product?",
          },
        ],
      },

      {
        questions: [
          {
            type: "text",
            name: "email",
            title:
              "Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below if you wish to participate in our drawing, then press the 'Submit' button.",
          },
        ],
      },
    ],
  };
  //Define a callback methods on survey complete
  onComplete(survey, options) {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
  }
  render() {
    //Create the model and pass it into react Survey component
    //You may create survey model outside the render function and use it in your App or component
    //The most model properties are reactive, on their change the component will change UI when needed.
    var model = new Survey.Model(this.json);
    return <Survey.Survey model={model} onComplete={this.onComplete} />;
    /*
     //The alternative way. react Survey component will create survey model internally
     return (<Survey.Survey json={this.json} onComplete={this.onComplete}/>);
     */
    //You may pass model properties directly into component or set it into model
    // <Survey.Survey model={model} mode="display"/>
    //or
    // model.mode="display"
    // <Survey.Survey model={model}/>
    // You may change model properties outside render function.
    //If needed react Survey Component will change its behavior and change UI.
  }
}

export default Introduction;
