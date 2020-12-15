import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
//import axios from "axios";
import axios from "../../services/Axios";
import WorkList from "./work.jsx";

class agentWorksDone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allworksdone: [],
    };
  }
  componentDidMount() {
    const { allworks } = this.state;
    axios
      .get(`/workdonebyuid/${localStorage.getItem("uid")}`) // axios returns a promise
      .then((response) => {
        console.log(response);
        this.setState({ allworksdone: response.data });
      })
      .catch(({ response }) => {});
  }

  render() {
    const { allworksdone } = this.state;
    return (
      <div>
        <div className="jumbotron">
          {allworksdone &&
            allworksdone.map((work) => {
              return <WorkList key={work._id} work={work} />;
            })}
        </div>
      </div>
    );
  }
}
export default agentWorksDone;
