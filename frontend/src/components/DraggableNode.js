// draggableNode.js
import React from "react";
import Icon from "./atoms/Icon";

export const DraggableNode = React.memo(({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = "grab";
  };

  return (
    <div
      className={`${type} cursor-grab min-w-[80px] h-[60px] flex items-center rounded-lg bg-white border border-gray-200 justify-center flex-col gap-1 shadow-sm`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
    >
      {icon && <Icon name={icon} className="w-6 h-6 text-indigo-600" />}
      <span className="text-gray-700 text-xs font-medium">{label}</span>
    </div>
  );
});
