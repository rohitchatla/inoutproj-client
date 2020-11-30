import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// const ROOT_URL = "http://localhost:3090/api";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // axios
    //   .get(`${ROOT_URL}/cats/getall/${localStorage.getItem("uid")}`) // axios returns a promise
    //   .then((response) => {})
    //   .catch(({ response }) => {});
  }

  render() {
    return (
      <div>
        <h2>Hello</h2>
      </div>
    );
  }
}

export default PostList;
