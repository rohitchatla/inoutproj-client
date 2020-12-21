import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
//import axios from "axios";
import axios from "../../services/Axios";
import { assestsURL } from "../../services/Axios";

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
      image: "",
      b64url: "",
      aadharcard: "",
    };
  }
  componentDidMount() {
    const { aadharcard } = this.state;
    axios
      .get(`/profile`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data.user);
        this.setState({ aadharcard: response.data.user.aadharcard });
      });
  }

  handleSubmit() {
    const {
      phno,
      sex,
      description,
      address,
      occupation,
      birthday,
      skills,
      image,
      b64url,
    } = this.state;
    const uid = localStorage.getItem("uid");

    // let obj = {
    //   uid,
    //   phno,
    //   sex,
    //   description,
    //   address,
    //   occupation,
    //   birthday,
    //   skills,
    //   b64url, //.substring(b64url.indexOf(",") + 1),
    // };

    const dataform = new FormData();

    dataform.append("uid", uid);
    dataform.append("phno", phno);
    dataform.append("birthday", birthday);
    dataform.append("sex", sex);
    dataform.append("skills", skills);
    dataform.append("address", address);
    dataform.append("occupation", occupation);
    dataform.append("description", description);
    dataform.append("image", image);
    dataform.append("b64url", b64url);

    axios
      .post("/agent/update", dataform, {
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

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  render() {
    const { b64url, image, aadharcard } = this.state;
    return (
      <div className="post">
        <h2 className="mb-5">Agent's Application</h2>
        {/* <form onSubmit={this.handleSubmit()}> */}
        <br />
        <br />
        <img
          alt={""}
          className="img-responsive product-img"
          src={assestsURL + aadharcard}
          width="250px"
          height="200px"
        />
        <br />
        <br />
        {"Image"}
        <br />
        <br />
        <input
          accept="image/*"
          onChange={(e) => {
            let idCardBase64 = "";
            this.getBase64(e.target.files[0], (result) => {
              idCardBase64 = result;
              this.setState({ b64url: result });
            });

            this.setState({ image: e.target.files[0] });

            // axios
            //   .post(`https://inout-mldl-pack.herokuapp.com/aadhar_ocr`, {
            //     text: "aadhar.jpg",
            //     payload: b64url.substring(b64url.indexOf(",") + 1),
            //   })
            //   .then((response) => {
            //     console.log(response);//cors issue
            //   });
          }}
          type="file"
        />
        <br />
        <br />
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
