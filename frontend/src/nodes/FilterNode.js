import { useState } from "react";
import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";

const filterOptions = ["equals", "not equal", "contains", "startsWith"];

const FilterNode = ({ id, data }) => {
  const [selected, setSelected] = useState(data?.filter || filterOptions[0]);

  const handles = [
    { type: "target", position: Position.Left, id: `${id}-in` },
    { type: "source", position: Position.Right, id: `${id}-out` },
  ];

  return (
    <BaseNode id={id} title="Filter" handles={handles} width={200} height={80}>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-xs font-medium text-gray-700">
          Filter:
          <select
            className="ml-2 px-2 py-1 border border-gray-300 rounded w-32 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {filterOptions.map((option) => (
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

export default FilterNode;
