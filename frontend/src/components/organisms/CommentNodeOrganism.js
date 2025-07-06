import React, { useState } from "react";
import BaseNode from "../BaseNode";
import FormField from "../molecules/FormField";

const CommentNodeOrganism = ({ id, data }) => {
  // Comment-specific state
  const [comment, setComment] = useState(data?.comment || "");

  // Comment-specific handles (no handles for comments)
  const handles = [];

  // Badge
  const textBadge = (
    <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded-full ml-2">
      Text
    </span>
  );

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
          label={
            <div className="flex items-center justify-between w-full">
              <span>Comment:</span>
              {textBadge}
            </div>
          }
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
