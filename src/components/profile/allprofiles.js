import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/Axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
class allProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProfilesAgent: [],
      allProfilesCust: [],
    };
  }
  async componentDidMount() {
    const { allProfilesAgent, allProfilesCust } = this.state;
    await axios
      .get(`allprofilesagent/`) // axios returns a promise
      .then(async (response) => {
        console.log(response);
        this.setState({ allProfilesAgent: response.data.user });

        await axios
          .get(`allprofilescust/`) // axios returns a promise
          .then((response) => {
            console.log(response);
            this.setState({ allProfilesCust: response.data.user });
          })
          .catch(({ response }) => {});
      })
      .catch(({ response }) => {});
  }

  render() {
    const { allProfilesAgent, allProfilesCust } = this.state;
    return (
      <div>
        <h4>Agents:</h4>
        <br />
        {allProfilesAgent &&
          allProfilesAgent.map((ag) => {
            return (
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {ag.firstName}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {ag.email}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {ag.description}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {ag.rating}/5
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      window.open(`/profiledetails/${ag._id}`, "_self");
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        <br />
        <h4>Customers:</h4>
        <br />
        {allProfilesCust &&
          allProfilesCust.map((cu) => {
            return (
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {cu.firstName}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {cu.email}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {cu.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      window.open(`/profiledetails/${cu._id}`, "_self");
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </div>
    );
  }
}

export default allProfiles;
