import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
//import axios from "axios";
import axios from "../../services/Axios";

class agentform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phno: "",
      sex: "",
      description: "",
      address: "",
      occupation: [],
      birthday: "",
      skills: "",
    };
  }
  componentDidMount() {}

  handleSubmit() {
    const {
      phno,
      sex,
      description,
      address,
      occupation,
      birthday,
      skills,
    } = this.state;
    const uid = localStorage.getItem("uid");

    let obj = {
      uid,
      phno,
      sex,
      description,
      address,
      occupation,
      birthday,
      skills,
    };
    axios
      .post("/agent/update", obj, {
        headers: {
          //"Content-Type": "multipart/form-data",
          //"x-access-token": `${localStorage.getItem("token")}`,
        },
      }) // axios returns a promise
      .then((response) => {
        window.open("/flashpage", "_self");
        alert("Submitted");
      })
      .catch(({ response }) => {});
  }

  renderAlert() {
    const { state } = this.props.history.location;
    const { action } = this.props.history;

    if (state && action === "REPLACE") {
      return (
        <div className="alert alert-danger" role="alert">
          {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="post">
        <h2 className="mb-5">Agent's Application</h2>
        {/* <form onSubmit={this.handleSubmit()}> */}
        <label>{"BirthDay"}</label>
        <input
          name="birthday"
          className="form-control"
          value={this.state.birthday}
          onChange={(e) => {
            this.setState({ [e.target.name]: e.target.value });
          }}
          type="date"
        />

        <label>{"Phone.no"}</label>
        <input
          name="phno"
          className="form-control"
          value={this.state.phno}
          onChange={(e) => {
            this.setState({ [e.target.name]: e.target.value });
          }}
        />

        <br />

        <label for="sex">Sex</label>
        <select
          name="sex"
          id="sex"
          value={this.state.sex}
          onChange={(e) => {
            console.log(e.target.value);
            this.setState({ [e.target.name]: e.target.value });
          }}
        >
          <option value="ss">Default</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>

        <br />

        <label>{"occupation"}</label>
        <input
          name="occupation"
          className="form-control"
          value={this.state.occupation}
          onChange={(e) => {
            this.setState({ [e.target.name]: e.target.value });
          }}
        />

        <br />

        <label>{"Address"}</label>
        <input
          name="address"
          className="form-control"
          value={this.state.address}
          onChange={(e) => {
            this.setState({ [e.target.name]: e.target.value });
          }}
        />

        <br />

        <label>{"Skills"}</label>
        <input
          name="skills"
          className="form-control"
          value={this.state.skills}
          onChange={(e) => {
            this.setState({ [e.target.name]: e.target.value });
          }}
        />
        <br />

        <label>{"Description"}</label>
        <input
          name="description"
          className="form-control"
          value={this.state.description}
          onChange={(e) => {
            this.setState({ [e.target.name]: e.target.value });
          }}
        />

        <button
          action="submit"
          className="btn btn-primary"
          onClick={() => this.handleSubmit()}
        >
          Publish
        </button>
        {/* </form> */}
      </div>
    );
  }
}

agentform = reduxForm({
  form: "post_new", // name of the form
})(agentform);

export default connect(null, { agentform })(agentform);
