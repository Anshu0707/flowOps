// Node type definitions and categories
export const nodeCategories = [
  {
    name: "General",
    nodes: [
      {
        type: "customInput",
        label: "Input",
        icon: "ArrowRightEndOnRectangle",
      },
      {
        type: "customText",
        label: "Text",
        icon: "DocumentText",
      },
      {
        type: "customOutput",
        label: "Output",
        icon: "ArrowRightStartOnRectangle",
      },
    ],
  },
  {
    name: "LLMs",
    nodes: [
      {
        type: "customLLM",
        label: "ChatGPT",
        icon: "lucide-bot",
      },
    ],
  },
  {
    name: "Transform",
    nodes: [
      {
        type: "customTransform",
        label: "Transform",
        icon: "ArrowsRightLeft",
      },
      {
        type: "customFilter",
        label: "Filter",
        icon: "Funnel",
      },
    ],
  },
  {
    name: "Control",
    nodes: [
      {
        type: "customCondition",
        label: "Condition",
        icon: "QuestionMarkCircle",
      },
      {
        type: "customDelay",
        label: "Delay",
        icon: "Clock",
      },
    ],
  },
  {
    name: "Chat",
    nodes: [
      {
        type: "customComment",
        label: "Comment",
        icon: "ChatBubbleLeftEllipsis",
      },
    ],
  },
];

// Get all nodes from all categories for search
export const getAllNodes = () => {
  return nodeCategories.flatMap((category) =>
    category.nodes.map((node) => ({
      ...node,
      category: category.name,
    }))
  );
};

// Get nodes by category
export const getNodesByCategory = (categoryName) => {
  const category = nodeCategories.find((cat) => cat.name === categoryName);
  return category ? category.nodes : [];
};

// Get all category names
export const getCategoryNames = () => {
  return nodeCategories.map((category) => category.name);
};

// Find node by type
export const findNodeByType = (nodeType) => {
  return getAllNodes().find((node) => node.type === nodeType);
};
