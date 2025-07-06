import React from "react";
import { getLayoutStyle } from "../../utils/styles";

const NodePaletteTemplate = ({
  // Content slots - organisms will be passed in
  header,
  search,
  categories,
  footer,

  // Layout options
  headerHeight = 60,
  searchHeight = 50,
  footerHeight = 60,

  // Styling props
  className = "",
  containerClassName = "",
  headerClassName = "",
  searchClassName = "",
  categoriesClassName = "",
  footerClassName = "",

  // Layout behavior
  showHeader = true,
  showSearch = true,
  showFooter = false,
  stickyHeader = true,
  stickyFooter = true,

  ...props
}) => {
  return (
    <div
      className={`h-full flex flex-col bg-white ${containerClassName}`}
      {...props}
    >
      {/* Header Section */}
      {showHeader && header && (
        <div
          className={`flex-shrink-0 border-b border-gray-200 ${
            stickyHeader ? "sticky top-0 z-10 bg-white" : ""
          } ${headerClassName}`}
          style={getLayoutStyle("height", headerHeight)}
        >
          {header}
        </div>
      )}

      {/* Search Section */}
      {showSearch && search && (
        <div
          className={`flex-shrink-0 border-b border-gray-200 ${searchClassName}`}
          style={getLayoutStyle("height", searchHeight)}
        >
          {search}
        </div>
      )}

      {/* Categories/Content Section */}
      <div className={`flex-1 ${categoriesClassName}`}>{categories}</div>

      {/* Footer Section */}
      {showFooter && footer && (
        <div
          className={`flex-shrink-0 border-t border-gray-200 ${
            stickyFooter ? "sticky bottom-0 z-10 bg-white" : ""
          } ${footerClassName}`}
          style={getLayoutStyle("height", footerHeight)}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default NodePaletteTemplate;
