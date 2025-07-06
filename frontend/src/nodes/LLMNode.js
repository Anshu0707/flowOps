// llmNode.js

import React from "react";
import LLMNodeOrganism from "../components/organisms/LLMNodeOrganism";

const LLMNode = ({ id, data }) => {
  return <LLMNodeOrganism id={id} data={data} />;
};

export default LLMNode;
