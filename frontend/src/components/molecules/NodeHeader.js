import React from "react";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

const NodeHeader = ({
  iconName,
  title,
  onClose,
  iconClassName = "w-5 h-5 text-indigo-600 flex-shrink-0",
  textClassName = "leading-none text-lg text-indigo-600",
  closeButtonClassName = "absolute top-2 right-2 z-20 p-1 text-indigo-600 hover:text-red-500 transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]",
}) => {
  return (
    <div className="flex items-center gap-2 relative">
      <Icon name={iconName} className={iconClassName} />
      <Text variant="body" weight="bold" className={textClassName}>
        {title}
      </Text>
      {onClose && (
        <button
          onClick={onClose}
          className={closeButtonClassName}
          title="Remove node"
        >
          <Icon name="XMarkCircle" className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default NodeHeader;
