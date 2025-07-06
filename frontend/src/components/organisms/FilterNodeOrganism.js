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

  // Filter-specific handles
  const handles = [
    { type: "target", position: Position.Left, id: `${id}-input` },
    { type: "source", position: Position.Right, id: `${id}-output` },
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
          label="Condition:"
          type="select"
          value={filterCondition}
          onChange={(e) => setFilterCondition(e.target.value)}
          options={filterOptions}
        />
        <FormField
          label="Value:"
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
