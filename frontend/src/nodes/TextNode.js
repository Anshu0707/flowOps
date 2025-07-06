// textNode.js

import React from "react";
import TextNodeOrganism from "../components/organisms/TextNodeOrganism";

const TextNode = ({ id, data }) => {
  return <TextNodeOrganism id={id} data={data} />;
};

export default TextNode;
