// draggableNode.js
import React from "react";
import Icon from "./atoms/Icon";
import { useStore } from "../store/store";

export const DraggableNode = React.memo(({ type, label, icon }) => {
  const { getNodeID, addNode } = useStore((state) => ({
    getNodeID: state.getNodeID,
    addNode: state.addNode,
  }));

  const handleClick = () => {
    // Create a new node at a default position (center of canvas)
    const nodeID = getNodeID(type);
    const newNode = {
      id: nodeID,
      type,
      position: { x: 400, y: 200 }, // Default center position
      data: { id: nodeID, nodeType: type },
    };
    addNode(newNode);
  };

  // Lightweight drag fallback for accessibility
  const onDragStart = (event) => {
    const appData = { nodeType: type };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`${type} cursor-grab min-w-[80px] h-[60px] flex items-center rounded-lg bg-white border border-gray-200 justify-center flex-col gap-1 shadow-sm hover:shadow-md transition-shadow duration-200`}
      onClick={handleClick}
      onDragStart={onDragStart}
      draggable
    >
      {icon && <Icon name={icon} className="w-6 h-6 text-indigo-600" />}
      <span className="text-gray-700 text-xs font-medium">{label}</span>
    </div>
  );
});
