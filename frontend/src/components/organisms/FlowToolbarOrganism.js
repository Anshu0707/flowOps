import React from "react";
import SubmitButton from "../SubmitButton";

const FlowToolbarOrganism = ({ nodeCount, edgeCount, flowData }) => {
  return (
    <div className="flex items-center justify-between px-3 py-1 h-full">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img
            src="/Robot_2.png"
            alt="FlowOps Logo"
            className="h-6 w-auto object-contain"
            onError={(e) => {
              console.error("Failed to load VectorShift logo");
              e.target.style.display = "none";
            }}
          />
          <h1 className="text-lg font-bold text-indigo-600 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)] transition-all duration-300 cursor-default">
            FlowOps
          </h1>
        </div>
        <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 shadow-sm">
          {nodeCount} nodes, {edgeCount} connections
        </span>
      </div>

      <div className="flex items-center gap-2">
        <SubmitButton flowData={flowData} />
      </div>
    </div>
  );
};

export default FlowToolbarOrganism;
