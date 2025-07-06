import React, { useState } from "react";
import BaseNode from "../BaseNode";
import FormField from "../molecules/FormField";

const CommentNodeOrganism = ({ id, data }) => {
  // Comment-specific state
  const [comment, setComment] = useState(data?.comment || "");

  // Comment-specific handles (no handles for comments)
  const handles = [];

  return (
    <BaseNode
      id={id}
      title="Comment"
      icon="ChatBubbleLeftEllipsis"
      description="Add notes and documentation to your workflow"
      width={300}
      minHeight={110}
      handles={handles}
    >
      <div className="flex flex-col gap-3 w-full">
        <FormField
          label="Comment:"
          type="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter comment..."
        />
      </div>
    </BaseNode>
  );
};

export default CommentNodeOrganism;
