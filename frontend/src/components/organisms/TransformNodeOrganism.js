import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "../BaseNode";
import FormField from "../molecules/FormField";

const TransformNodeOrganism = ({ id, data }) => {
  // Transform-specific state
  const [transformType, setTransformType] = useState(
    data?.transformType || "uppercase"
  );
  const [customTransform, setCustomTransform] = useState(
    data?.customTransform || ""
  );

  // Transform-specific handles
  const handles = [
    { type: "target", position: Position.Left, id: `${id}-input` },
    { type: "source", position: Position.Right, id: `${id}-output` },
  ];

  // Transform-specific options
  const transformOptions = [
    "uppercase",
    "lowercase",
    "capitalize",
    "reverse",
    "custom",
  ];

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="ArrowsRightLeft"
      description="Modify and transform data between different formats"
      width={280}
      minHeight={140}
      handles={handles}
    >
      <div className="flex flex-col gap-3 w-full">
        <FormField
          label="Type:"
          type="select"
          value={transformType}
          onChange={(e) => setTransformType(e.target.value)}
          options={transformOptions}
        />
        {transformType === "custom" && (
          <FormField
            label="Custom Transform:"
            type="textarea"
            value={customTransform}
            onChange={(e) => setCustomTransform(e.target.value)}
            placeholder="Enter custom transformation logic..."
          />
        )}
      </div>
    </BaseNode>
  );
};

export default TransformNodeOrganism;
