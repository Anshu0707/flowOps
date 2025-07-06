// outputNode.js

import React from "react";
import OutputNodeOrganism from "../components/organisms/OutputNodeOrganism";

const OutputNode = ({ id, data }) => {
  return <OutputNodeOrganism id={id} data={data} />;
};

export default OutputNode;
