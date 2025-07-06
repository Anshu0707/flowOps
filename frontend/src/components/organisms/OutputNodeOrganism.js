import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "../BaseNode";
import FormField from "../molecules/FormField";

const OutputNodeOrganism = ({ id, data }) => {
  // Output-specific state
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");
  const [output, setOutput] = useState(data?.output || "");
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Output-specific handles
  const handles = [
    { type: "target", position: Position.Left, id: `${id}-value` },
  ];

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="ArrowRightEndOnRectangle"
      description="Output data of different types from your workflow"
      width={280}
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
          label="Type:"
          type="select"
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          options={["Text", "File", "JSON"]}
        />
        <FormField
          label="Output:"
          type="input"
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          placeholder='Type "{{" to utilize variables'
        />
      </div>
    </BaseNode>
  );
};

export default OutputNodeOrganism;
