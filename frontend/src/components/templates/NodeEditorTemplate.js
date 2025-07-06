import React from "react";
import { getLayoutStyle } from "../../utils/styles";

const NodeEditorTemplate = ({
  // Content slots
  header,
  content,
  actions,

  // Layout options
  position = "right", // right, left, modal
  width = 400,
  height = "100vh",

  // Styling props
  className = "",
  containerClassName = "",
  headerClassName = "",
  contentClassName = "",
  actionsClassName = "",

  // Layout behavior
  showHeader = true,
  showActions = true,
  overlay = true,
  closeOnOverlayClick = true,
  onClose,

  ...props
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case "right":
        return "fixed top-0 right-0 h-full transform transition-transform duration-300 ease-in-out";
      case "left":
        return "fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out";
      case "modal":
        return "fixed inset-0 flex items-center justify-center z-50";
      default:
        return "fixed top-0 right-0 h-full transform transition-transform duration-300 ease-in-out";
    }
  };

  const getContainerClasses = () => {
    switch (position) {
      case "modal":
        return "bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-hidden";
      default:
        return "bg-white shadow-2xl border-l border-gray-200";
    }
  };

  const renderContent = () => (
    <div
      className={`${getContainerClasses()} ${containerClassName}`}
      style={{
        ...getLayoutStyle("width", position === "modal" ? "auto" : width),
        ...getLayoutStyle("height", position === "modal" ? "auto" : height),
        ...props.style,
      }}
      {...props}
    >
      {/* Header Section */}
      {showHeader && header && (
        <div
          className={`flex-shrink-0 border-b border-gray-200 bg-gray-50 ${headerClassName}`}
        >
          {header}
        </div>
      )}

      {/* Content Section */}
      <div className={`flex-1 overflow-y-auto ${contentClassName}`}>
        {content}
      </div>

      {/* Actions Section */}
      {showActions && actions && (
        <div
          className={`flex-shrink-0 border-t border-gray-200 bg-gray-50 p-4 ${actionsClassName}`}
        >
          {actions}
        </div>
      )}
    </div>
  );

  if (position === "modal") {
    return (
      <div className={getPositionClasses()}>
        {overlay && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />
        )}
        {renderContent()}
      </div>
    );
  }

  return <div className={getPositionClasses()}>{renderContent()}</div>;
};

export default NodeEditorTemplate;
