import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
//import axios from "axios";
import axios from "../../services/Axios";
import { assestsURL } from "../../services/Axios";
import StripeCheckout from "react-stripe-checkout";
import "./style.css";

//import io from "socket.io-client";
import io from "socket.io-client/dist/socket.io.js";
import { socketCon } from "../../services/Axios";

const socket = io(socketCon, {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10001,
  transports: ["websocket"],
});

class WorkDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work: [],
      service: {},
      agent: {},
      status: {},
      workstatus: {},
      role: "",
      cstatus: "",
      cworkstatus: "",
      fagentid: "",
      youarefagent: false,
    };
  }

  async refreshFunc() {
    const {
      work,
      service,
      agent,
      status,
      workstatus,
      role,
      cstatus,
      cworkstatus,
      fagentid,
      youarefagent,
    } = this.state;
    const { id } = this.props.match.params;
    await axios
      .get(`/work/${id}`) // axios returns a promise
      .then((response) => {
        //console.log(response);
        this.setState({ work: response.data });
        this.setState({ agent: response.data.agentId });
        this.setState({ status: response.data.status[0] });
        this.setState({ workstatus: response.data.workstatus[0] });
        this.setState({ cstatus: response.data.currentstatus });
        this.setState({ cworkstatus: response.data.currentworkstatus });
        this.setState({ fagentid: response.data.fagentid });
        if (work.finalagentId == localStorage.getItem("uid")) {
          this.setState({ youarefagent: true });
        } else {
          this.setState({ youarefagent: false });
        }
      })
      .catch(({ response }) => {});
  }

  async componentDidMount() {
    //socket.emit("getuploadstatus", { cid: cid });
    // socket.on("init", (i) => {});

    const {
      work,
      service,
      agent,
      status,
      workstatus,
      role,
      cstatus,
      cworkstatus,
      fagentid,
      youarefagent,
    } = this.state;
    const { id } = this.props.match.params;
    await axios
      .get(`/work/${id}`) // axios returns a promise
      .then((response) => {
        //console.log(response);
        this.setState({ work: response.data });
        this.setState({ agent: response.data.agentId });
        this.setState({ status: response.data.status[0] });
        this.setState({ workstatus: response.data.workstatus[0] });
        this.setState({ cstatus: response.data.currentstatus });
        this.setState({ cworkstatus: response.data.currentworkstatus });
        this.setState({ fagentid: response.data.fagentid });

        if (work.finalagentId == localStorage.getItem("uid")) {
          this.setState({ youarefagent: true });
        } else {
          this.setState({ youarefagent: false });
        }

        axios
          .get(`/serviceid2service/${response.data.serviceId}`) // axios returns a promise
          .then((response) => {
            //console.log(response);
            this.setState({ service: response.data });
          })
          .catch(({ response }) => {});
      })
      .catch(({ response }) => {});

    await axios
      .get(`/profile/${localStorage.getItem("uid")}`) // axios returns a promise
      .then((response) => {
        console.log(response.data);
        if (response.data.user && response.data.user.isAgent) {
          this.setState({ role: "agent" });
        } else {
          this.setState({ role: "cust" });
        }
      })
      .catch(({ response }) => {});

    socket.emit("init", { uid: localStorage.getItem("uid") });

    socket.on("refresh", (payload) => {
      if (payload.work.userId == localStorage.getItem("uid")) {
        this.refreshFunc();
      } else if (payload.work.finalagentId == localStorage.getItem("uid")) {
        this.refreshFunc();
      } else {
        let work = payload.work;
        const exists = (agent_id) => agent_id == localStorage.getItem("uid");
        if (work.agentId.some(exists)) {
          this.refreshFunc();
        }
      }
    });
  }

  handleTakeJob() {
    //agent routine
    const {
      work,
      service,
      agent,
      status,
      workstatus,
      role,
      cstatus,
      cworkstatus,
      fagentid,
      youarefagent,
    } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`/work/status/agentrequested`, {
        wid: id,
        agentid: localStorage.getItem("uid"),
      }) // axios returns a promise
      .then((response) => {
        //console.log(work);
        socket.emit("agenttake", { work: work });
        //window.location.reload();
      })
      .catch(({ response }) => {});
  }

  handleAcceptJob(fagentid) {
    //cust routine
    const {
      work,
      service,
      agent,
      status,
      workstatus,
      role,
      cstatus,
      cworkstatus,
      youarefagent,
    } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`/work/status/custaccepted`, {
        wid: id,
        fagentid,
        custid: localStorage.getItem("uid"),
      }) // axios returns a promise
      .then((response) => {
        socket.emit("custacceptjob", { work: work, fagentid: fagentid });
        //window.location.reload();
      })
      .catch(({ response }) => {});
  }

  handleReject() {
    //cust routine
    const {
      work,
      service,
      agent,
      status,
      workstatus,
      role,
      cstatus,
      cworkstatus,
      fagentid,
      youarefagent,
    } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`/work/status/custrejected`, {
        wid: id,
        custid: localStorage.getItem("uid"),
      }) // axios returns a promise
      .then((response) => {
        socket.emit("custrejectjob", { work: work, fagentid: fagentid });
        //window.location.reload();
      })
      .catch(({ response }) => {});
  }

  handleRejectAgent() {
    //agent routine
    const {
      work,
      service,
      agent,
      status,
      workstatus,
      role,
      cstatus,
      cworkstatus,
      fagentid,
      youarefagent,
    } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`/work/status/agentrejected`, {
        wid: id,
        custid: localStorage.getItem("uid"),
      }) // axios returns a promise
      .then((response) => {
        socket.emit("agentrejectjob", { work: work });
        //window.location.reload();
      })
      .catch(({ response }) => {});
  }

  handleComplete() {
    //cust routine
    const {
      work,
      service,
      agent,
      status,
      workstatus,
      role,
      cstatus,
      cworkstatus,
      fagentid,
      youarefagent,
    } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`/work/status/workdone`, {
        wid: id,
        custid: localStorage.getItem("uid"),
      }) // axios returns a promise
      .then((response) => {
        socket.emit("completedjob", { work: work });
        //window.location.reload();
      })
      .catch(({ response }) => {});
  }

  makePayment = (token) => {
    //cust routine
    const {
      work,
      service,
      agent,
      status,
      workstatus,
      role,
      cstatus,
      cworkstatus,
      fagentid,
      youarefagent,
    } = this.state;
    const { id } = this.props.match.params;
    axios
      .post("/payment", {
        uid: localStorage.getItem("uid"),
        token: token,
        work: work,
        to: work.agentId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert("Something went wrong.");
        console.log(err);
      });
  };

  render() {
    const {
      work,
      service,
      agent,
      status,
      workstatus,
      role,
      cstatus,
      cworkstatus,
      fagentid,
      youarefagent,
    } = this.state;
    return (
      <div>
        <div>
          <img src={assestsURL + work.photo} />
          <h1 className="xtreame">Name: {work.name}</h1>
          <h1 className="display-5">Description: {work.description}</h1>
          <h1 className="display-5">Cost: {work.cost}</h1>
          <h1 className="display-5">Service: {service.name}</h1>
          {role == "agent" ? (
            <button
              className="btn btn-warning"
              onClick={() => this.handleTakeJob()}
            >
              Take Job
            </button>
          ) : (
            ""
          )}
        </div>

        {role == "cust" ? (
          <div>
            <h2>AgentDetails</h2>
            <br />
            {agent.length > 0 &&
              agent.map((agent) => {
                <div>
                  <p>{agent.firstName}</p>
                  <p>{agent.lastName}</p>
                  <p>{agent.email}</p>
                  <p>{agent.occupation}</p>
                  <p>{agent.skills}</p>
                  <button
                    className="btn btn-success"
                    onClick={() => this.handleAcceptJob(agent._id)}
                  >
                    Accept Job
                  </button>
                </div>;
              })}
          </div>
        ) : (
          ""
        )}

        <div>
          <h1 className="display-5">Status:</h1>
          {status && (
            <div>
              {status.customerRequested &&
                (role == "cust" ? (
                  <h5 className="display-7">"You requested/posted a Work"</h5>
                ) : (
                  //role==agent
                  <h5 className="display-7">"Customer posted a new Work"</h5>
                ))}
              {status.agentRequested &&
                (role == "cust" ? (
                  <h5 className="display-7">
                    Found few Agents(Agent found your work Interesting)
                  </h5>
                ) : (
                  <h5 className="display-7">
                    You just requested for this Work)
                  </h5>
                ))}

              {status.customerAccepted &&
                (role == "cust" ? (
                  <h5 className="display-7">
                    "You Accepted an Agent for your work"
                  </h5>
                ) : (
                  <h5 className="display-7">
                    "Customer Accepted an Agent for work"
                  </h5>
                ))}
              {status.customerCancelled &&
                (role == "cust" ? (
                  <h5 className="display-7">"You cancelled the work"</h5>
                ) : (
                  <h5 className="display-7">"Customer cancelled the work"</h5>
                ))}
              {status.agentCancelled &&
                (role == "cust" ? (
                  <h5 className="display-7">"Agent cancelled the work"</h5>
                ) : (
                  <h5 className="display-7">"You cancelled the work"</h5>
                ))}

              {status.workDone &&
                (role == "cust" ? (
                  <h5 className="display-7">Workdone</h5>
                ) : (
                  <h5 className="display-7">Workdone</h5>
                ))}
            </div>
          )}
        </div>

        {/* <div>
          <h1 className="display-5">Current-Status:</h1>
          {cstatus == "custrequested" &&
            (role == "cust" ? (
              <h5 className="display-7">You requested/posted a Work</h5>
            ) : (
              //role==agent
              <h5 className="display-7">"Customer posted a new Work"</h5>
            ))}
          {cstatus ==
            "agentrequested"(
              role == "cust" ? (
                <h5 className="display-7">
                  Found few Agents(Agent found your work Interesting)
                </h5>
              ) : (
                <h5 className="display-7">You just requested for this Work</h5>
              )
            )}
          {cstatus ==
            "custaccepted"(
              role == "cust" ? (
                <h5 className="display-7">
                  "You Accepted an Agent for your work"
                </h5>
              ) : (
                <h5 className="display-7">
                  "Customer Accepted an Agent for work"
                </h5>
              )
            )}

          {cstatus ==
            "custcancelled"(
              role == "cust" ? (
                <h5 className="display-7">"You cancelled the work"</h5>
              ) : (
                <h5 className="display-7">"Customer cancelled the work"</h5>
              )
            )}
          {cstatus ==
            "agentcancelled"(
              role == "cust" ? (
                <h5 className="display-7">"Agent cancelled the work"</h5>
              ) : (
                <h5 className="display-7">"You cancelled the work"</h5>
              )
            )}

          {cstatus ==
            "workdone"(
              role == "cust" ? (
                <h5 className="display-7">WorkDone</h5>
              ) : (
                <h5 className="display-7">WorkDone</h5>
              )
            )}
        </div> */}

        <div>
          <h1>Work Status</h1>
          {workstatus.workOngoing &&
            (role == "cust" ? (
              <h5 className="display-7">Work Ongoing</h5>
            ) : (
              <h5 className="display-7">Work Ongoing</h5>
            ))}
          {workstatus.workCancelled &&
            (role == "cust" ? (
              <h5 className="display-7">Work Cancelled</h5>
            ) : (
              <h5 className="display-7">Work Cancelled</h5>
            ))}
          {workstatus.workCompleted &&
            (role == "cust" ? (
              <h5 className="display-7">Work Completed</h5>
            ) : (
              <h5 className="display-7">Work Completed</h5>
            ))}
        </div>

        {/* <div>
          <h1>Work Current - Status</h1>
          {cworkstatus ==
            "ongoing"(
              role == "cust" ? (
                <h5 className="display-7">Work Ongoing</h5>
              ) : (
                <h5 className="display-7">Work Ongoing</h5>
              )
            )}
          {cworkstatus ==
            "workcancelled"(
              role == "cust" ? (
                <h5 className="display-7">Work Cancelled</h5>
              ) : (
                <h5 className="display-7">Work Cancelled</h5>
              )
            )}
          {cworkstatus ==
            "workdone"(
              role == "cust" ? (
                <h5 className="display-7">Work Completed</h5>
              ) : (
                <h5 className="display-7">Work Completed</h5>
              )
            )}
        </div> */}

        {status.customerAccepted &&
          (role == "cust" ? (
            <div>
              <button
                className="btn btn-danger"
                onClick={() => this.handleReject()}
              >
                Decline
              </button>
            </div>
          ) : (
            <div>
              <button
                className="btn btn-danger"
                onClick={() => this.handleRejectAgent()}
              >
                Decline
              </button>
            </div>
          ))}

        {status.customerAccepted &&
          (role == "cust" ? (
            <div>
              <button
                className="btn btn-success"
                onClick={() => this.handleComplete()}
              >
                Work Completed
              </button>
            </div>
          ) : (
            ""
          ))}

        <div class="card-body">
          <StripeCheckout
            // {process.env.REACT_APP_KEY}
            stripeKey="pk_test_51HxnljJ5CsssC8yKFd4sx8wonMtnqETno4Ea8CcVwdgcznfFU1aPQRlQ03TPXHAlowYBAUUUsWHd8OeZW1V0uvWj00DRfzAVjY"
            token={this.makePayment}
            name={work.name}
            currency="INR"
            amount={work.cost * 100}
          >
            <button className="btn btn-info">Pay</button>
          </StripeCheckout>
        </div>
      </div>
    );
  }
}
export default WorkDetails;
