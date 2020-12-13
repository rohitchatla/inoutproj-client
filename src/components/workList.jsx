import React from "react";
import Work from "../components/work.jsx";

class WorkList extends React.Component {
  render() {
    return (
      <div>
        {this.props.work.map((work) => (
          <Work key={work.id} work={work} />
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  products: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

ProductList.defaultProps = {
  products: [],
};

export default WorkList;
