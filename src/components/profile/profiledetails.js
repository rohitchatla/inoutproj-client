import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/Axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { assestsURL } from "../../services/Axios";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
class profileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdetails: [],
      feedbacks: [],
    };
  }
  async componentDidMount() {
    const { pdetails } = this.state;
    const { id } = this.props.match.params;
    await axios
      .get(`profiledet/${id}`) // axios returns a promise
      .then(async (response) => {
        console.log(response);
        this.setState({ pdetails: response.data.user });
      })
      .catch(({ response }) => {});

    await axios
      .get(`getfeedbacks/${id}`) // axios returns a promise
      .then((response) => {
        console.log(response);
        this.setState({ feedbacks: response.data });
      })
      .catch(({ response }) => {});
  }

  feedback = () => {
    const { id } = this.props.match.params;
    const { pdetails, feedbacks } = this.state;
    let fagentID = id;
    let custID = localStorage.getItem("uid"); //feedback is given by customer only-->(so your id)

    let feedbackText = prompt("Give feedback");
    let ratingForWork = prompt("How would you rate (out of /5)");
    axios
      .post("/feedback", {
        fagentID: fagentID,
        custID: custID,
        workID: "", //general
        feedbackText: feedbackText,
        ratingForWork: ratingForWork,
      })
      .then(async (res) => {
        console.log(res);

        let fe = [...feedbacks];
        fe.push(res);
        this.setState({ feedbacks: fe });

        // axios
        //   .get(`getfeedbacks/${id}`) // axios returns a promise
        //   .then((response) => {
        //     console.log(response);
        //     this.setState({ feedbacks: response.data });
        //   })
        //   .catch(({ response }) => {});
      })
      .catch((err) => {
        alert("Something went wrong.");
        console.log(err);
      });
  };

  render() {
    const { pdetails, feedbacks } = this.state;
    return (
      <>
        {/* <Navbar transparent /> */}
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-gray-300">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src={assestsURL + pdetails.photo}
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            window.open(
                              `https://chatrooms-2dbf2.web.app/login`,
                              "_self"
                            );
                          }}
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      {/* <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            22
                          </span>
                          <span className="text-sm text-gray-500">Friends</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            10
                          </span>
                          <span className="text-sm text-gray-500">Photos</span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            89
                          </span>
                          <span className="text-sm text-gray-500">
                            Comments
                          </span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                      {pdetails.firstName}-{pdetails.lastName}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                      {pdetails.address}
                    </div>
                    <div className="mb-2 text-gray-700 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                      {pdetails.description}-{pdetails.occupation}
                    </div>
                    <div className="mb-2 text-gray-700">
                      <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                      {pdetails.email}
                    </div>
                    <div className="mb-2 text-gray-700">
                      <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                      {pdetails.isAgent ? "Agent" : ""}
                    </div>
                    {pdetails.isAgent && (
                      <div className="mb-2 text-gray-700">
                        <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                        Ratings:
                        {pdetails.isAgent ? pdetails.rating + " /5" : ""}
                      </div>
                    )}
                  </div>

                  {feedbacks &&
                    feedbacks.map((f) => {
                      return (
                        <Card variant="outlined">
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              {f.feedbackText}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                              {f.ratingForWork}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                              From:
                              {f.fromID && f.fromID.firstName
                                ? f.fromID.firstName
                                : ""}
                              -
                              {f.fromID && f.fromID.lastName
                                ? f.fromID.lastName
                                : ""}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                              To:{f.toID.firstName}-{f.toID.lastName}
                            </Typography>
                            {f.workID && (
                              <Typography color="textSecondary" gutterBottom>
                                Work:{f.workID.name}-Rs.{f.workID.cost}
                              </Typography>
                            )}
                            {f.sentiment && (
                              <Typography color="textSecondary" gutterBottom>
                                [NLP] Sentiment-Confidence(0-1)-
                                {f.sentiment.sentiment}
                                -Rs.
                                {f.sentiment.confidence}
                              </Typography>
                            )}
                          </CardContent>
                          <CardActions>
                            <Button size="small">Learn More</Button>
                          </CardActions>
                        </Card>
                      );
                    })}

                  <button
                    className="btn btn-warning"
                    onClick={() => this.feedback()}
                  >
                    Feedback
                  </button>

                  <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                          {pdetails.description}
                        </p>
                        <a
                          href="#"
                          className="font-normal text-blue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Show more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* <Footer /> */}
      </>
    );
  }
}

export default profileDetails;
