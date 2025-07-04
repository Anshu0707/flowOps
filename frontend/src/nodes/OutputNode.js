// outputNode.js

import { useState } from "react";
import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handles = [
    { type: "target", position: Position.Left, id: `${id}-value` },
  ];

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={handles}
      width={220}
      minHeight={110}
    >
      <div className="flex flex-col gap-3 w-full">
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-indigo-50 placeholder-gray-400"
          style={{ minWidth: 0 }}
          placeholder="Enter name..."
        />
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row items-center justify-between w-full mb-1">
            <span className="text-xs font-medium text-gray-700">Type:</span>
            <span className="text-xs font-bold text-indigo-600 tracking-wide bg-white px-1 rounded shadow-sm ml-2">
              Dropdown
            </span>
          </div>
          <select
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-indigo-50"
            style={{ minWidth: 0 }}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};

export default OutputNode;
