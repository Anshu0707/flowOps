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

  // Only one handle for 'Prompt' field
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: "50%" },
    },
    { type: "source", position: Position.Right, id: `${id}-response` },
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
          label="Model:"
          type="select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          options={modelOptions}
        />
        <FormField
          label="System:"
          type="textarea"
          value={system}
          onChange={(e) => setSystem(e.target.value)}
          placeholder="Enter system message..."
        />
        <FormField
          label="Prompt:"
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
