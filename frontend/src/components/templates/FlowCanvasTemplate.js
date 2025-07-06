import React from "react";
import { getLayoutStyle } from "../../utils/styles";

const FlowCanvasTemplate = ({
  // Layout slots
  toolbar,
  sidebar,
  flowArea,
  statusBar,

  // Layout options
  sidebarPosition = "left", // left, right, top
  sidebarWidth = 280,
  sidebarHeight = 120, // New prop for top sidebar height
  toolbarHeight = 60,
  statusBarHeight = 40,

  // Styling props
  className = "",
  containerClassName = "",
  toolbarClassName = "",
  sidebarClassName = "",
  flowAreaClassName = "",
  statusBarClassName = "",

  // Layout behavior
  showSidebar = true,
  showToolbar = true,
  showStatusBar = false,

  ...props
}) => {
  const getLayoutClasses = () => {
    if (sidebarPosition === "top") {
      return "flex-col";
    }
    if (sidebarPosition === "right") {
      return "flex-row";
    }
    return "flex-row";
  };

  const getSidebarOrder = () => {
    if (sidebarPosition === "right") {
      return "order-last";
    }
    if (sidebarPosition === "top") {
      return "order-first";
    }
    return "order-first";
  };

  const getSidebarStyle = () => {
    if (sidebarPosition === "top") {
      return { height: sidebarHeight };
    }
    return { width: sidebarWidth };
  };

  const getSidebarBorder = () => {
    if (sidebarPosition === "top") {
      return "border-b border-gray-200";
    }
    return "border-r border-gray-200";
  };

  return (
    <div
      className={`h-screen w-full flex flex-col bg-gray-50 ${containerClassName}`}
      {...props}
    >
      {/* Toolbar Section */}
      {showToolbar && toolbar && (
        <div
          className={`flex-shrink-0 bg-white border-b border-gray-200 shadow-sm ${toolbarClassName}`}
          style={getLayoutStyle("height", toolbarHeight)}
        >
          {toolbar}
        </div>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex ${getLayoutClasses()} overflow-hidden`}>
        {/* Sidebar */}
        {showSidebar && sidebar && (
          <div
            className={`flex-shrink-0 bg-white shadow-sm ${getSidebarOrder()} ${getSidebarBorder()} ${sidebarClassName}`}
            style={getSidebarStyle()}
          >
            {sidebar}
          </div>
        )}

        {/* Flow Area */}
        <div className={`flex-1 relative bg-gray-50 ${flowAreaClassName}`}>
          {flowArea}
        </div>
      </div>

      {/* Status Bar */}
      {showStatusBar && statusBar && (
        <div
          className={`flex-shrink-0 bg-white border-t border-gray-200 shadow-sm ${statusBarClassName}`}
          style={getLayoutStyle("height", statusBarHeight)}
        >
          {statusBar}
        </div>
      )}
    </div>
  );
};

export default FlowCanvasTemplate;
