import React from "react";
import { Handle, Position } from "reactflow";
import { getHandleStyle } from "../../utils/styles";

const NodeHandle = ({
  id,
  type = "source",
  position = Position.Right,
  style = {},
  label,
  labelStyle = {},
  ...props
}) => {
  const handleStyle = getHandleStyle(type, false, style);

  return (
    <div className="relative">
      <Handle
        type={type}
        position={position}
        id={id}
        style={handleStyle}
        {...props}
      />
      {label && (
        <div
          className="absolute pointer-events-none select-none"
          style={{
            ...labelStyle,
            ...(position === Position.Right && {
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
            }),
            ...(position === Position.Left && {
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
            }),
            ...(position === Position.Top && {
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
            }),
            ...(position === Position.Bottom && {
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
            }),
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default NodeHandle;
