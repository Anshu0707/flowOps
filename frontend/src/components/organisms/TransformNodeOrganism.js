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

  // Centered handles (half inside, half outside)
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`,
      style: { top: "50%", left: "-8px", transform: "translateY(-50%)" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
      style: { top: "50%", right: "-8px", transform: "translateY(-50%)" },
    },
  ];

  // Transform-specific options
  const transformOptions = [
    "uppercase",
    "lowercase",
    "capitalize",
    "reverse",
    "custom",
  ];

  // Badge
  const dropdownBadge = (
    <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded-full ml-2">
      Dropdown
    </span>
  );

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
          label={
            <div className="flex items-center justify-between w-full">
              <span>Type:</span>
              {dropdownBadge}
            </div>
          }
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
