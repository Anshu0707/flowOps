// textNode.js

import { useState, useEffect, useRef } from "react";
import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";

// Utility to extract valid JS variable names in {{ ... }}
const parseVariables = (text) => {
  // JS variable: starts with letter/$_, then letters/numbers/$_
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const matches = [];
  let match;
  while ((match = regex.exec(text))) {
    matches.push(match[1]);
  }
  return matches;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 220, height: 80 });
  const inputRef = useRef(null);
  const measureRef = useRef(null);

  // Parse variables on text change
  useEffect(() => {
    setVariables(parseVariables(currText));
  }, [currText]);

  // Auto-resize width and height using a hidden span for width measurement
  useEffect(() => {
    if (inputRef.current && measureRef.current) {
      // Set the span's text to the textarea's value
      measureRef.current.textContent = currText || " ";
      // Get the width of the span
      const measuredWidth = measureRef.current.offsetWidth + 40; // add some padding
      // Set textarea height
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
      setDimensions({
        width: Math.max(220, Math.min(600, measuredWidth)),
        height: Math.max(80, inputRef.current.scrollHeight + 50),
      });
    }
  }, [currText]);

  // Handles: right output + one for each variable on the left
  const handles = [
    ...variables.map((v, i) => ({
      type: "target",
      position: Position.Left,
      id: `${id}-var-${v}`,
      style: {
        top: 40 + i * 24, // space handles vertically
        left: -8,
      },
    })),
    { type: "source", position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={handles}
      width={dimensions.width}
      minHeight={dimensions.height}
    >
      <div className="flex flex-col items-center justify-center w-full h-full gap-2">
        {/* Hidden span for measuring text width */}
        <span
          ref={measureRef}
          className="invisible absolute whitespace-pre-wrap px-3 py-2 text-sm font-mono"
          style={{ minWidth: 120, maxWidth: 600 }}
        />
        <label className="w-full flex flex-col items-center">
          <span className="mb-1 text-xs text-gray-500">Text:</span>
          <textarea
            ref={inputRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            className="resize-none border border-blue-200 shadow-inner rounded px-3 py-2 text-sm w-full min-h-[32px] text-center focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50"
            style={{
              overflow: "hidden",
              minWidth: 120,
              maxWidth: 600,
              width: dimensions.width - 40,
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};

export default TextNode;
