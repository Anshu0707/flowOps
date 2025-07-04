// llmNode.js

import { useState } from "react";
import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
      style: { top: `${100 / 3}%` },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: `${200 / 3}%` },
    },
    { type: "source", position: Position.Right, id: `${id}-response` },
  ];

  // OpenAI model options
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

  // Local state for model selection
  const [selectedModel, setSelectedModel] = useState(
    data?.model || modelOptions[0]
  );
  // Local state for system and prompt fields
  const [system, setSystem] = useState(data?.system || "");
  const [prompt, setPrompt] = useState(data?.prompt || "");

  return (
    <BaseNode
      id={id}
      title="OpenAI"
      handles={handles}
      width={320}
      minHeight={220}
    >
      <div className="flex flex-col gap-3 w-full">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-700">
            System (Instructions)
          </span>
          <input
            type="text"
            className="px-2 py-1 border border-gray-300 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-indigo-50 placeholder-gray-400"
            placeholder="e.g. You are a helpful assistant."
            value={system}
            onChange={(e) => setSystem(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-700">Prompt</span>
          <input
            type="text"
            className="px-2 py-1 border border-gray-300 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-indigo-50 placeholder-gray-400"
            placeholder="e.g. What is the weather today?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-700">Model</span>
          <select
            className="px-2 py-1 border border-gray-300 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-indigo-50"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            {modelOptions.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </label>
      </div>
    </BaseNode>
  );
};

export default LLMNode;
