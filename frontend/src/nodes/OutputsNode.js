import React from "react";
import { Position } from "reactflow";
import BaseNode from "../components/BaseNode";
import { ArrowUpCircle } from "lucide-react";

const OutputsNode = ({ id, data }) => {
  const { variables = [] } = data || {};

  // Create handles for each variable
  const handles = variables.map((variable, index) => ({
    type: "source",
    position: Position.Right,
    id: variable,
    style: { top: `${20 + index * 20}%` },
  }));

  return (
    <BaseNode
      id={id}
      title="Outputs"
      icon="ArrowUpCircle"
      description="Variable outputs from text processing"
      width={40}
      minHeight={80}
      handles={handles}
      showCloseButton={false} // No close button since it's attached to TextNode
    >
      <div className="p-2">
        <div className="text-xs font-medium text-gray-600 mb-2">Variables</div>
        {variables.length > 0 ? (
          <div className="space-y-1">
            {variables.map((variable) => (
              <div
                key={variable}
                className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200"
              >
                {variable}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-gray-400 italic">No variables</div>
        )}
      </div>
    </BaseNode>
  );
};

export default OutputsNode;
