import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import Icon from "./atoms/Icon";
import { useStore } from "../store/store";
import clsx from "clsx";
import {
  nodeStyles,
  getHandleStyle,
  getNodeStyle,
  designTokens,
} from "../utils/styles";

const BaseNode = ({
  id,
  title,
  icon,
  leftIcon,
  description,
  width = 320,
  minHeight = 120,
  children,
  handles = [],
  showCloseButton = true,
  iconPosition = "left",
  ...props
}) => {
  const { setNodes } = useReactFlow();
  const edges = useStore((state) => state.edges);
  const removeNode = useStore((state) => state.removeNode);

  const handleClose = () => {
    // Remove node and all its connected edges
    removeNode(id);
    // Also update ReactFlow's internal state
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  // Helper to check if a handle is connected
  const isHandleConnected = (handleId, type) => {
    if (type === "source") {
      // Check if any edge has source = this node and sourceHandle = handleId
      return edges.some(
        (edge) => edge.source === id && edge.sourceHandle === handleId
      );
    } else {
      // type === "target"
      return edges.some(
        (edge) => edge.target === id && edge.targetHandle === handleId
      );
    }
  };

  return (
    <div
      className={clsx(nodeStyles.base)}
      style={getNodeStyle(width, minHeight, props.style)}
      {...props}
    >
      {/* Handles */}
      {handles.map((handle, idx) => {
        const connected = isHandleConnected(
          handle.id || `${id}-handle-${idx}`,
          handle.type
        );
        return (
          <Handle
            key={handle.id || idx}
            type={handle.type}
            position={handle.position || Position.Left}
            id={handle.id || `${id}-handle-${idx}`}
            style={{
              ...getHandleStyle(handle.type, connected),
              ...handle.style,
            }}
            {...handle.rest}
          />
        );
      })}
      {/* Title */}
      <div
        className={clsx(nodeStyles.title)}
        style={{ position: "relative", zIndex: designTokens.zIndex.base }}
      >
        <div className={clsx(nodeStyles.header)}>
          <div className={clsx(nodeStyles.titleContent)}>
            {leftIcon && (
              <div className={clsx(nodeStyles.icon)}>
                {typeof leftIcon === "string" ? (
                  <Icon name={leftIcon} />
                ) : (
                  leftIcon
                )}
              </div>
            )}
            {icon && iconPosition === "left" && (
              <Icon name={icon} className={clsx(nodeStyles.icon)} />
            )}
            <span className={clsx(nodeStyles.titleText)}>{title}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Close Button - moved here for proper alignment */}
            {showCloseButton && (
              <button
                onClick={handleClose}
                className={clsx(nodeStyles.closeButton)}
                title="Remove node"
              >
                <Icon name="XMarkCircle" className="w-5 h-5 font-bold" />
              </button>
            )}
            {/* Icon positioned at the far right */}
            {icon && iconPosition === "right" && (
              <Icon name={icon} className={clsx(nodeStyles.icon)} />
            )}
          </div>
        </div>
        {description && (
          <div className={clsx(nodeStyles.description)}>
            <p className={clsx(nodeStyles.descriptionText)}>{description}</p>
          </div>
        )}
      </div>
      {/* Content */}
      <div className={clsx(nodeStyles.content)}>{children}</div>
    </div>
  );
};

export default BaseNode;
