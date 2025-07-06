import React from "react";
import { getBezierPath, getSmoothStepPath } from "reactflow";

const AnimatedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  type = "smoothstep",
}) => {
  const [edgePath] = React.useMemo(() => {
    if (type === "smoothstep") {
      return getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
      });
    }
    return getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
  }, [
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    type,
  ]);

  const gradientId = `gradient-${id}`;

  return (
    <>
      {/* Main edge path */}
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        stroke="#6366f1"
        strokeWidth={2}
        fill="none"
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Animated circles */}
      <circle
        r="4"
        fill={`url(#${gradientId})`}
        stroke="#6366f1"
        strokeWidth="1"
        filter="drop-shadow(0 0 4px rgba(99, 102, 241, 0.6))"
      >
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={edgePath}
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
        />
      </circle>

      <circle
        r="3"
        fill={`url(#${gradientId})`}
        stroke="#6366f1"
        strokeWidth="1"
        filter="drop-shadow(0 0 3px rgba(99, 102, 241, 0.5))"
      >
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={edgePath}
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
          begin="-1s"
        />
      </circle>

      <circle
        r="2"
        fill={`url(#${gradientId})`}
        stroke="#6366f1"
        strokeWidth="1"
        filter="drop-shadow(0 0 2px rgba(99, 102, 241, 0.4))"
      >
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={edgePath}
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
          begin="-0.5s"
        />
      </circle>
    </>
  );
};

export default AnimatedEdge;
