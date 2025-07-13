import React from "react";
import { Position } from "reactflow";
import BaseNode from "../BaseNode";
import { ArrowUpCircle } from "lucide-react";
import { designTokens } from "../../utils/styles";

const OutputsNodeOrganism = ({ id, data }) => {
  const { variables = [] } = data || {};

  // No handles on OutputsNode - they're now on TextNode
  const handles = [];

  const leftIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4 mt-0.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );

  return (
    <BaseNode
      id={id}
      title="Outputs"
      icon="ArrowRightCircle"
      leftIcon={leftIcon}
      description="Variable outputs from text processing"
      width={260}
      minHeight={80}
      handles={handles}
      showCloseButton={false} // No close button since it's attached to TextNode
      style={{ zIndex: designTokens.zIndex.overlay }}
      iconPosition="right" // Move icon to the right side
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

export default OutputsNodeOrganism;
