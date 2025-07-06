import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "../BaseNode";
import FormField from "../molecules/FormField";
import { Bot } from "lucide-react";

const LLMNodeOrganism = ({ id, data }) => {
  // LLM-specific state
  const [selectedModel, setSelectedModel] = useState(data?.model || "gpt-4o");
  const [system, setSystem] = useState(data?.system || "");
  const [prompt, setPrompt] = useState(data?.prompt || "");

  // Centered handles (half inside, half outside)
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: "50%", left: "-8px", transform: "translateY(-50%)" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`,
      style: { top: "50%", right: "-8px", transform: "translateY(-50%)" },
    },
  ];

  // LLM-specific model options
  const modelOptions = [
    "gpt-4o",
    "gpt-4",
    "gpt-4-turbo",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "text-davinci-003",
    "text-curie-001",
    "text-babbage-001",
    "text-ada-001",
  ];

  // Badges
  const dropdownBadge = (
    <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded-full ml-2">
      Dropdown
    </span>
  );
  const textBadge = (
    <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded-full ml-2">
      Text
    </span>
  );

  return (
    <BaseNode
      id={id}
      title={
        <span className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-indigo-600" />
          ChatGPT
        </span>
      }
      icon={null}
      width={400}
      minHeight={200}
      handles={handles}
    >
      <div className="flex flex-col gap-3 w-full">
        <FormField
          label={
            <div className="flex items-center justify-between w-full">
              <span>Model:</span>
              {dropdownBadge}
            </div>
          }
          type="select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          options={modelOptions}
        />
        <FormField
          label={
            <div className="flex items-center justify-between w-full">
              <span>System:</span>
              {textBadge}
            </div>
          }
          type="textarea"
          value={system}
          onChange={(e) => setSystem(e.target.value)}
          placeholder="Enter system message..."
        />
        <FormField
          label={
            <div className="flex items-center justify-between w-full">
              <span>Prompt:</span>
              {textBadge}
            </div>
          }
          type="textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt..."
        />
      </div>
    </BaseNode>
  );
};

export default LLMNodeOrganism;
