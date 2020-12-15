import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
//import axios from "axios";
import axios from "../../services/Axios";

class addWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      cost: "",
      serviceId: "5fd62041823fd06e7263e392",
      services: [],
      file: "",
    };
  }
  componentDidMount() {
    const { services } = this.state;
    axios
      .get(`getservices`) // axios returns a promise
      .then((response) => {
        console.log(response);
        this.setState({ services: response.data });
      })
      .catch(({ response }) => {});
  }

  handleSubmit() {
    const { name, description, cost, serviceId, file } = this.state;
    const uid = localStorage.getItem("uid");
    const dataform = new FormData();
    dataform.append("uid", uid);
    dataform.append("name", name);
    dataform.append("description", description);
    dataform.append("cost", cost);
    dataform.append("serviceId", serviceId);
    dataform.append("file", file);
    // let obj = {
    //   uid,
    //   name,
    //   description,
    //   cost,
    //   serviceId,
    //   file,
    // };
    axios
      .post("/work", dataform, {
        headers: {
          "Content-Type": "multipart/form-data",
          //"x-access-token": `${localStorage.getItem("token")}`,
        },
      }) // axios returns a promise
      .then((response) => {
        window.open("/flashpage", "_self");
        alert("Submitted");
      })
      .catch(({ response }) => {});
  }

  renderTextEditor = (field) => (
    <fieldset className="form-group">
      <label>{field.label}</label>
      <input className="form-control" id="x" type="hidden" name="content" />
      <trix-editor input="x" {...field.input} />
    </fieldset>
  );

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

  handleChange = (name) => (event) => {
    const { file } = this.state;
    const value = name === "file" ? event.target.files[0] : event.target.value;
    // setValues({ ...values, [name]: value });

    this.setState({ file: value }, () => {
      console.log(file);
    });
  };

  render() {
    const { file } = this.state;
    return (
      <div className="post">
        <h2 className="mb-5">New Work</h2>
        {/* <form onSubmit={this.handleSubmit()}> */}
        <label>{"Name"}</label>
        <input
          name="name"
          className="form-control"
          value={this.state.name}
          onChange={(e) => {
            this.setState({ [e.target.name]: e.target.value });
          }}
        />

        <label>{"description"}</label>
        <input
          name="description"
          className="form-control"
          value={this.state.description}
          onChange={(e) => {
            this.setState({ [e.target.name]: e.target.value });
          }}
        />
        {"Image"}
        <input
          accept="image/*"
          onChange={(e) => {
            this.setState({ file: e.target.files[0] }, () => {
              console.log(file);
            });
          }}
          type="file"
        />

        <br />

        <label for="services">Choose a ServiceType</label>
        <select
          name="serviceId"
          id="services"
          value={this.state.serviceId}
          onChange={(e) => {
            console.log(e.target.value);
            this.setState({ [e.target.name]: e.target.value });
          }}
        >
          {/* <option value="5fd62041823fd06e7263e392">Default</option> */}
          {this.state.services &&
            this.state.services.map((se) => {
              return <option value={se._id}>{se.name}</option>;
            })}
        </select>

        <br />

        <label>{"Cost"}</label>
        <input
          name="cost"
          className="form-control"
          value={this.state.cost}
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

addWork = reduxForm({
  form: "post_new", // name of the form
})(addWork);

export default connect(null, { addWork })(addWork);
