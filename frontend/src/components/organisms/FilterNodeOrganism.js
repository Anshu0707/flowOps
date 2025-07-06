import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "../BaseNode";
import FormField from "../molecules/FormField";

const FilterNodeOrganism = ({ id, data }) => {
  // Filter-specific state
  const [filterCondition, setFilterCondition] = useState(
    data?.filterCondition || "contains"
  );
  const [filterValue, setFilterValue] = useState(data?.filterValue || "");

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

  // Filter-specific options
  const filterOptions = [
    "contains",
    "starts_with",
    "ends_with",
    "equals",
    "not_equals",
    "greater_than",
    "less_than",
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
      title="Filter"
      icon="Funnel"
      description="Filter and sort data based on specific conditions"
      width={280}
      minHeight={140}
      handles={handles}
    >
      <div className="flex flex-col gap-3 w-full">
        <FormField
          label={
            <div className="flex items-center justify-between w-full">
              <span>Condition:</span>
              {dropdownBadge}
            </div>
          }
          type="select"
          value={filterCondition}
          onChange={(e) => setFilterCondition(e.target.value)}
          options={filterOptions}
        />
        <FormField
          label={
            <div className="flex items-center justify-between w-full">
              <span>Value:</span>
              {textBadge}
            </div>
          }
          type="input"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Enter filter value..."
        />
      </div>
    </BaseNode>
  );
};

export default FilterNodeOrganism;
