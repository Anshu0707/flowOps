import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "../BaseNode";
import FormField from "../molecules/FormField";

const ConditionNodeOrganism = ({ id, data }) => {
  // Condition-specific state
  const [condition, setCondition] = useState(data?.condition || "");
  const [operator, setOperator] = useState(data?.operator || "equals");

  // Condition-specific handles
  const handles = [
    { type: "target", position: Position.Left, id: `${id}-input` },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-true`,
      style: {
        top: "20%",
        background: "#10b981", // Green for True
        boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)", // Glowing green
        border: "2px solid white",
        position: "absolute",
        zIndex: 10,
      },
      label: "T",
      labelStyle: {
        color: "#10b981",
        fontSize: "12px",
        fontWeight: "bold",
        textShadow: "0 0 4px rgba(16, 185, 129, 0.8)",
      },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-false`,
      style: {
        top: "80%",
        background: "#ef4444", // Red for False
        boxShadow: "0 0 8px rgba(239, 68, 68, 0.6)", // Glowing red
        border: "2px solid white",
        position: "absolute",
        zIndex: 10,
      },
      label: "F",
      labelStyle: {
        color: "#ef4444",
        fontSize: "12px",
        fontWeight: "bold",
        textShadow: "0 0 4px rgba(239, 68, 68, 0.8)",
      },
    },
  ];

  // Condition-specific operators
  const operatorOptions = [
    "equals",
    "not_equals",
    "greater_than",
    "less_than",
    "greater_than_or_equal",
    "less_than_or_equal",
    "contains",
    "not_contains",
  ];

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon="QuestionMarkCircle"
      description="Add conditional logic and branching to your workflow"
      width={280}
      minHeight={140}
      handles={handles}
    >
      <div className="flex flex-col gap-3 w-full">
        <FormField
          label="Operator:"
          type="select"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          options={operatorOptions}
        />
        <FormField
          label="Condition:"
          type="textarea"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="Enter condition (e.g., value > 10)..."
        />
      </div>
    </BaseNode>
  );
};

export default ConditionNodeOrganism;
