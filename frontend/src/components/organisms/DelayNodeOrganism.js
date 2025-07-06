import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "../BaseNode";
import FormField from "../molecules/FormField";

const DelayNodeOrganism = ({ id, data }) => {
  // Delay-specific state
  const [delayTime, setDelayTime] = useState(data?.delayTime || 1000);
  const [delayUnit, setDelayUnit] = useState(data?.delayUnit || "ms");

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

  // Delay-specific units
  const unitOptions = ["ms", "s", "m"];

  // Badges
  const textBadge = (
    <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded-full ml-2">
      Text
    </span>
  );
  const dropdownBadge = (
    <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded-full ml-2">
      Dropdown
    </span>
  );

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
          label={
            <div className="flex items-center justify-between w-full">
              <span>Time:</span>
              {textBadge}
            </div>
          }
          type="input"
          value={delayTime}
          onChange={(e) => setDelayTime(e.target.value)}
          placeholder="Enter delay time..."
          inputType="number"
        />
        <FormField
          label={
            <div className="flex items-center justify-between w-full">
              <span>Unit:</span>
              {dropdownBadge}
            </div>
          }
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
