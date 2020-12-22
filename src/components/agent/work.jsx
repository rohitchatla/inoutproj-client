import React from "react";

import { Col, Panel } from "react-bootstrap";
import { assestsURL } from "../../services/Axios";

function Work(props) {
  let { work } = props;

  return (
    <Col lg={3} md={4} sm={6}>
      <Panel className="product">
        <div className="product-img-wrapper">
          {/* <a href="#"> */}
          <img
            alt={work.name}
            className="img-responsive product-img"
            //src={`data:image/jpeg;base64,${work.photo}`}
            //src={"/api/work/" + work._id}
            src={assestsURL + work.photo}
          />
          {/* </a> */}
        </div>

        <h4 className="ellipsis" title={work.name}>
          <a href="#">{work.name}</a>
        </h4>

        <div className="pull-right h4 product-price">{`${work.cost}$`}</div>
      </Panel>
    </Col>
  );
}

export default Work;
