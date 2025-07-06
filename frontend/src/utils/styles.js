import clsx from "clsx";

// Design Tokens - Centralized constants
export const designTokens = {
  colors: {
    primary: {
      50: "#eef2ff",
      100: "#e0e7ff",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
    },
    red: {
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
    },
    green: {
      500: "#10b981",
      600: "#059669",
      700: "#047857",
    },
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    xxl: "3rem", // 48px
  },
  sizes: {
    handle: {
      width: "16px",
      height: "16px",
    },
    node: {
      minWidth: "180px",
      defaultWidth: "320px",
      minHeight: "120px",
      maxWidth: "480px",
      outputsWidth: "300px",
    },
    sidebar: {
      width: "280px",
    },
    toolbar: {
      height: "60px",
    },
  },
  zIndex: {
    base: 1,
    handle: 10,
    node: 100,
    overlay: 1000,
    modal: 9999,
  },
  shadows: {
    handle: "0 2px 8px 0 rgba(99,102,241,0.10)",
    handleHover: "0 2px 8px 0 rgba(99,102,241,0.3)",
    node: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    nodeHover: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  timing: {
    debounce: "500ms",
    transition: "200ms",
  },
};

// Node Styles
export const nodeStyles = {
  base: "group bg-white border border-indigo-500 rounded-xl shadow-lg flex flex-col transition-all duration-200 hover:shadow-2xl hover:border-green-500 focus:border-green-500 p-0",
  title:
    "mx-2 mt-2 mb-0 rounded-lg bg-blue-50 shadow-sm border border-indigo-100 px-4 py-3 tracking-wide",
  content: "flex-1 flex flex-col justify-center w-full h-full p-4 gap-2",
  header: "flex items-center justify-between mb-1",
  titleContent: "flex items-center gap-2",
  icon: "w-5 h-5 text-indigo-600 font-bold",
  titleText: "text-indigo-600 font-bold text-lg leading-6",
  description: "ml-7",
  descriptionText: "text-black text-xs font-normal font-sans",
  closeButton:
    "p-1 text-indigo-600 hover:text-red-500 transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]",
};

// Handle Styles
export const handleStyles = {
  base: "z-10 border-2 border-white w-8 h-8 shadow-[0_2px_8px_0_rgba(99,102,241,0.10)]",
  connected: "bg-indigo-500",
  disconnected: "bg-zinc-400",
  source: {
    background: designTokens.colors.primary[500],
    border: "2px solid white",
    width: designTokens.sizes.handle.width,
    height: designTokens.sizes.handle.height,
    boxShadow: designTokens.shadows.handle,
    zIndex: designTokens.zIndex.handle,
  },
  target: {
    background: designTokens.colors.gray[400],
    border: "2px solid white",
    width: designTokens.sizes.handle.width,
    height: designTokens.sizes.handle.height,
    boxShadow: designTokens.shadows.handle,
    zIndex: designTokens.zIndex.handle,
  },
};

// Form Styles
export const formStyles = {
  container: "flex flex-col",
  label: "block text-sm font-semibold text-gray-700 mb-1",
  input:
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
  textarea:
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none",
  select:
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white",
  fieldWrapper: "mt-1",
};

// Button Styles
export const buttonStyles = {
  primary:
    "bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
  secondary:
    "bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
  danger:
    "bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
};

// Layout Styles
export const layoutStyles = {
  container: "h-screen w-full flex flex-col bg-gray-50",
  toolbar: "flex-shrink-0 bg-white border-b border-gray-200 shadow-sm",
  sidebar: "flex-shrink-0 bg-white shadow-sm",
  content: "flex-1 relative bg-gray-50",
  statusBar: "flex-shrink-0 bg-white border-t border-gray-200 shadow-sm",
};

// Utility function for combining styles
export const combineStyles = (...styleObjects) => {
  return styleObjects.reduce((acc, styleObj) => {
    if (typeof styleObj === "string") {
      return clsx(acc, styleObj);
    }
    if (typeof styleObj === "object") {
      return clsx(acc, ...Object.values(styleObj));
    }
    return acc;
  }, "");
};

// Utility function for conditional styles
export const conditionalStyles = (baseStyles, conditions) => {
  return clsx(baseStyles, conditions);
};

// Handle style utilities
export const getHandleStyle = (
  type = "source",
  isConnected = false,
  customStyle = {}
) => {
  const baseStyle =
    type === "source" ? handleStyles.source : handleStyles.target;
  const connectedStyle = isConnected
    ? { background: designTokens.colors.primary[500] }
    : {};

  return {
    ...baseStyle,
    ...connectedStyle,
    ...customStyle,
  };
};

// Node style utilities
export const getNodeStyle = (
  width = designTokens.sizes.node.defaultWidth,
  minHeight = designTokens.sizes.node.minHeight,
  customStyle = {}
) => {
  return {
    width: width,
    minHeight: minHeight,
    minWidth: Math.min(width, designTokens.sizes.node.minWidth),
    position: "relative",
    ...customStyle,
  };
};

// Layout style utilities
export const getLayoutStyle = (type, value) => {
  switch (type) {
    case "height":
      return { height: value };
    case "width":
      return { width: value };
    case "sidebar":
      return { width: value };
    case "toolbar":
      return { height: value };
    default:
      return {};
  }
};
