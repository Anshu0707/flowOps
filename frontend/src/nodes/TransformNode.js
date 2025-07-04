import { useState } from "react";
import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";

const transformOptions = ["uppercase", "lowercase", "trim", "hash"];

const TransformNode = ({ id, data }) => {
  const [selected, setSelected] = useState(
    data?.transform || transformOptions[0]
  );

  const handles = [
    { type: "target", position: Position.Left, id: `${id}-in` },
    { type: "source", position: Position.Right, id: `${id}-out` },
  ];

  return (
    <BaseNode
      id={id}
      title="Transform"
      handles={handles}
      width={200}
      height={80}
    >
      <div className="flex flex-col gap-2 w-full">
        <label className="text-xs font-medium text-gray-700">
          Transformation:
          <select
            className="ml-2 px-2 py-1 border border-gray-300 rounded w-32 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {transformOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </BaseNode>
  );
};

export default TransformNode;
