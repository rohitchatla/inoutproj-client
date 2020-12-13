import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
//import axios from "axios";
import axios from "../../services/Axios";
import WorkList from "./work.jsx";

class myWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allworks: [],
    };
  }
  componentDidMount() {
    const { allworks } = this.state;
    axios
      .get(`/workbyuid/${localStorage.getItem("uid")}`) // axios returns a promise
      .then((response) => {
        console.log(response);
        this.setState({ allworks: response.data });
      })
      .catch(({ response }) => {});
  }

  render() {
    const { allworks } = this.state;
    return (
      <div>
        <h1>Welcome</h1>
        <h1 className="display-5">Do work and Get your work done</h1>
        <div className="jumbotron">
          {allworks &&
            allworks.map((work) => {
              return <WorkList key={work._id} work={work} />;
            })}
        </div>
      </div>
    );
  }
}
export default myWorks;
