import { useState } from "react";
import axios from "axios";
import { POST_EVENT_API, FORM_SUBMIT_API } from "./utils/constants";
import { getQueryVariable, getQueryVariables } from "./utils/helpers";
import "./App.css";

function App() {
  // used For LRW Research
  const [queryParameters, setqueryParameters] = useState("");
  const [init, setInit] = useState(false);

  //COMMENTED CODE IS USED FOR AGENCY NEEDS CHANGING BASED ON END GOAL DETAILS
  // USED FOR LRW RESEARCH
  const handleSubmit = (event) => {
    // event.preventDefault();
    // let selectedFeatureDetailIDs = [];
    // this.props.data.map((group) => {
    //   return group.features.map((feature) => {
    //     if (
    //       this.props.dependencies.featureDescriptionDisabledIDs.hasOwnProperty(
    //         feature.featureID
    //       )
    //     ) {
    //       if (
    //         this.props.dependencies.featureDescriptionDisabledIDs[
    //           feature.featureID
    //         ].disable
    //       ) {
    //         return false;
    //       }
    //     }
    //     return feature.featureDetails.map((featureDetail) => {
    //       if (featureDetail.isBase) {
    //         return selectedFeatureDetailIDs.push(featureDetail.ID);
    //       }
    //       return false;
    //     });
    //   });
    // });
    // let query;
    // if (this.props.queryParameters) {
    //   query = getQueryVariables(this.props.queryParameters);
    // }
    // axios
    //   .post(`${FORM_SUBMIT_API}`, {
    //     userID: query && query.ID ? query.ID : "",
    //     sessionID: query && query.Session ? query.Session : "",
    //     engine: query && query.Engine ? query.Engine : "",
    //     testStatus: query && query.TestStatus ? query.TestStatus : "",
    //     serverLoc: query && query.ServerLoc ? query.ServerLoc : "",
    //     FeatureID: selectedFeatureDetailIDs,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // // if query params it indicates it is from the research platform. Create redirects per the documentation
    // if (query && query.Engine && query.Session) {
    //   if (query.ServerLoc == "S") {
    //     window.location.href = `https://stage70.datacollectionsite.com/mriWeb/mriWeb.dll?I.Project=&I.SavePoint=&Redirect=1&I.Engine=${query.Engine}&I.Session=${query.Session}`;
    //   } else if (query.ServerLoc == "P") {
    //     window.location.href = `https://webtraffic.datacollectionsite.com/mriWeb/mriWeb.dll?I.Project=&I.SavePoint=&Redirect=1&I.Engine=${query.Engine}&I.Session=${query.Session}`;
    //   }
    // } else {
    //   window.location.href = "/productbuilderrange";
    // }
  };

  // const POST_EVENT_INITIALIZATION = (featureDetailID) => {
  //   let query = getQueryVariable("ID", this.props.queryParameters);

  //   let QUERY_ID = query ? query : "";

  //   axios
  //     .post(`${POST_EVENT_API}`, {
  //       logIID: "0",
  //       loginName: QUERY_ID,
  //       logdetails: `ONLOAD ${this.props.queryParameters}`,
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  //   this.setState({
  //     init: false,
  //   });
  // };

  // if (queryParameters && init) {
  //   POST_EVENT_INITIALIZATION();
  // }

  return (
    <div className="App">
      <form onSubmit={() => handleSubmit()}></form>
    </div>
  );
}

export default App;
