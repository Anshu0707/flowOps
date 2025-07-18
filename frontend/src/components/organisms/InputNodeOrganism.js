import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "../BaseNode";
import FormField from "../molecules/FormField";

const InputNodeOrganism = ({ id, data }) => {
  // Input-specific state
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Input-specific handles (centered, half outside the right boundary)
  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-value`,
      style: { top: "50%", right: "-8px", transform: "translateY(-50%)" }, // 16px handle, half outside
    },
  ];

  // Custom label row with badge right-aligned
  const typeLabel = (
    <div className="flex items-center justify-between w-full">
      <span>Type:</span>
      <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded-full ml-2">
        Dropdown
      </span>
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="ArrowRightEndOnRectangle"
      description="Pass data of different types into your workflow"
      width={260}
      minHeight={110}
      handles={handles}
    >
      <div className="flex flex-col gap-3 w-full">
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="Enter name..."
          className={`w-full px-3 py-2 bg-blue-50 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center transition-colors duration-200 ${
            isInputFocused ? "text-green-600" : "text-indigo-600"
          }`}
        />
        <FormField
          label={typeLabel}
          type="select"
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          options={["Text", "File"]}
        />
      </div>
    </BaseNode>
  );
};

export default InputNodeOrganism;
