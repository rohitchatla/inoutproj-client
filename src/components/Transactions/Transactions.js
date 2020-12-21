import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import "./Transactions.css";
import axios from "../../services/Axios";

class previoustransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      boxdata: [],
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }
  _onButtonClick() {
    if (this.state.showComponent) {
      this.setState({
        showComponent: false,
      });
    } else {
      this.setState({
        showComponent: true,
      });
    }
  }

  componentDidMount(prevProps) {
    axios
      .get(`payment/trans/${localStorage.getItem("uid")}`)
      .then(({ data }) => {
        console.log(data.length);
        this.setState({ boxdata: data });
      })
      .catch((err) => console.log(err) || alert(JSON.stringify(err)));
  }

  render() {
    return (
      <div className="paymentIt">
        <h3 id="fontIt">Previous Transactions</h3>
        <div className="row">
          <div className={`${this.state.showComponent ? "col-6" : "col-12"}`}>
            <table className="table adjustIt">
              <thead>
                <tr>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Taken</th>
                  <th scope="col">Receipt URL</th>
                </tr>
              </thead>

              {this.state.boxdata.map((data) => (
                <tr>
                  <td>{data.amount.toFixed(2)}</td>
                  <td>{data.date.split("T")[0]}</td>
                  <td>{data.date.split("T")[1]}</td>
                  <td>
                    {data.receipt_url[0] == "h" ? (
                      <a href={data.receipt_url} target="_blank">
                        Receipt
                      </a>
                    ) : (
                      data.receipt_url
                    )}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default previoustransaction;
