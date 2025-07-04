import React from "react";
import { Handle, Position } from "reactflow";

const BaseNode = ({
  id,
  title,
  width = 320,
  minHeight = 120,
  children,
  handles = [],
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col transition-all duration-200 hover:shadow-2xl hover:border-indigo-500 p-0"
      style={{ width, minHeight, minWidth: 180, position: "relative" }}
    >
      {/* Handles */}
      {handles.map((handle, idx) => {
        // Extract variable name for left-side handles (id format: `${id}-var-${variable}`)
        return (
          <Handle
            key={handle.id || idx}
            type={handle.type}
            position={handle.position || Position.Left}
            id={handle.id || `${id}-handle-${idx}`}
            style={{
              ...handle.style,
              zIndex: 10,
              background:
                handle.type === "source"
                  ? "#6366f1" // indigo-500
                  : "#a1a1aa", // zinc-400 for target
              border: "2px solid #fff",
              width: 16,
              height: 16,
              boxShadow: "0 2px 8px 0 rgba(99,102,241,0.10)",
            }}
            {...handle.rest}
          />
        );
      })}
      {/* Title */}
      <div className="px-4 py-2 font-semibold text-base border-b border-gray-100 text-center bg-indigo-50 rounded-t-xl text-indigo-700 shadow-sm tracking-wide">
        {title}
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center w-full h-full p-4 gap-2">
        {children}
      </div>
    </div>
  );
};

export default BaseNode;
