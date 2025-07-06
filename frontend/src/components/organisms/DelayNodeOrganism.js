import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "../BaseNode";
import FormField from "../molecules/FormField";

const DelayNodeOrganism = ({ id, data }) => {
  // Delay-specific state
  const [delayTime, setDelayTime] = useState(data?.delayTime || 1000);
  const [delayUnit, setDelayUnit] = useState(data?.delayUnit || "ms");

  // Delay-specific handles
  const handles = [
    { type: "target", position: Position.Left, id: `${id}-input` },
    { type: "source", position: Position.Right, id: `${id}-output` },
  ];

  // Delay-specific units
  const unitOptions = ["ms", "s", "m"];

  return (
    <BaseNode
      id={id}
      title="Delay"
      icon="Clock"
      description="Add time delays and pauses to your workflow execution"
      width={280}
      minHeight={110}
      handles={handles}
    >
      <div className="flex flex-col gap-3 w-full">
        <FormField
          label="Time:"
          type="input"
          value={delayTime}
          onChange={(e) => setDelayTime(e.target.value)}
          placeholder="Enter delay time..."
          inputType="number"
        />
        <FormField
          label="Unit:"
          type="select"
          value={delayUnit}
          onChange={(e) => setDelayUnit(e.target.value)}
          options={unitOptions}
        />
      </div>
    </BaseNode>
  );
};

export default DelayNodeOrganism;
