import React from "react";
import CommentNodeOrganism from "../components/organisms/CommentNodeOrganism";

const CommentNode = ({ id, data }) => {
  return <CommentNodeOrganism id={id} data={data} />;
};

export default CommentNode;
