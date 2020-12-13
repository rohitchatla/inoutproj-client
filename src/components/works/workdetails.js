import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
//import axios from "axios";
import axios from "../../services/Axios";

class WorkDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work: [],
      service: {},
      agent: {},
      status: {},
      workstatus: {},
    };
  }
  async componentDidMount() {
    const { work, service } = this.state;
    const { id } = this.props.match.params;
    await axios
      .get(`/work/${id}`) // axios returns a promise
      .then((response) => {
        console.log(response);
        this.setState({ work: response.data });
        this.setState({ agent: response.data.agentId });
        this.setState({ status: response.data.status[0] });
        this.setState({ workstatus: response.data.workstatus[0] });

        axios
          .get(`/serviceid2service/${response.data.serviceId}`) // axios returns a promise
          .then((response) => {
            //console.log(response);
            this.setState({ service: response.data });
          })
          .catch(({ response }) => {});
      })
      .catch(({ response }) => {});
  }

  handleTakeJob() {
    const { work } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`/work/status/agentrequested`, {
        wid: id,
        agentid: localStorage.getItem("uid"),
      }) // axios returns a promise
      .then((response) => {
        window.location.reload();
      })
      .catch(({ response }) => {});
  }

  handleAcceptJob() {
    const { work } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`/work/status/custaccepted`, {
        wid: id,
        custid: localStorage.getItem("uid"),
      }) // axios returns a promise
      .then((response) => {
        window.location.reload();
      })
      .catch(({ response }) => {});
  }

  handleReject() {
    const { work } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`/work/status/custrejected`, {
        wid: id,
        custid: localStorage.getItem("uid"),
      }) // axios returns a promise
      .then((response) => {
        window.location.reload();
      })
      .catch(({ response }) => {});
  }

  handleComplete() {
    const { work } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`/work/status/workdone`, {
        wid: id,
        custid: localStorage.getItem("uid"),
      }) // axios returns a promise
      .then((response) => {
        window.location.reload();
      })
      .catch(({ response }) => {});
  }

  render() {
    const { work, agent, service, workstatus, status } = this.state;
    return (
      <div>
        <div>
          <h1 className="display-5">Name: {work.name}</h1>
          <h1 className="display-5">Description: {work.description}</h1>
          <h1 className="display-5">Cost: {work.cost}</h1>
          <h1 className="display-5">Service: {service.name}</h1>
          <button
            className="btn btn-warning"
            onClick={() => this.handleTakeJob()}
          >
            Take Job
          </button>
        </div>
        <br />
        <h2>AgentDetails</h2>
        <br />
        {agent && (
          <div>
            <p>{agent.firstName}</p>
            <p>{agent.lastName}</p>
            <p>{agent.email}</p>
            <p>{agent.occupation}</p>
            <p>{agent.skills}</p>
            <button
              className="btn btn-success"
              onClick={() => this.handleAcceptJob()}
            >
              Accept Job
            </button>
          </div>
        )}
        <br />
        <br />
        <br />
        <br />
        <div>
          <h1 className="display-5">Status:</h1>
          {status && (
            <div>
              {status.customerAccepted && (
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleReject()}
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <br />
        <div>
          <button
            className="btn btn-success"
            onClick={() => this.handleComplete()}
          >
            Work Completed
          </button>
        </div>
      </div>
    );
  }
}
export default WorkDetails;
