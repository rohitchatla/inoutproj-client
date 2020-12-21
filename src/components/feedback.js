import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../services/Axios";
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
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
    };
  }
  componentDidMount() {
    const { feedbacks } = this.state;
    axios
      .get(`getfeedbacks/${localStorage.getItem("uid")}`) // axios returns a promise
      .then((response) => {
        console.log(response);
        this.setState({ feedbacks: response.data });
      })
      .catch(({ response }) => {});
  }

  render() {
    const { feedbacks } = this.state;
    return (
      <div>
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
                    {f.fromID && f.fromID.firstName ? f.fromID.firstName : ""}-
                    {f.fromID && f.fromID.lastName ? f.fromID.lastName : ""}
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
                      Sentiment-Confidence(0-1)-
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
      </div>
    );
  }
}

export default Feedback;
