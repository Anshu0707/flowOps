import React, { useMemo, useState } from "react";
import { DraggableNode } from "../DraggableNode";
import Icon from "../atoms/Icon";
import { Bot } from "lucide-react";
import { useStore } from "../../store/store";
import {
  nodeCategories,
  getAllNodes,
  getNodesByCategory,
} from "../../config/nodeTypes";

const NodePaletteOrganism = () => {
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { getNodeID, addNode } = useStore((state) => ({
    getNodeID: state.getNodeID,
    addNode: state.addNode,
  }));

  // Get all nodes from all categories for search - memoized to prevent recalculation
  const allNodes = useMemo(() => {
    return getAllNodes();
  }, []); // Empty dependency array since nodeCategories is static

  // Filter nodes based on search term - optimized with early returns
  const filteredNodes = useMemo(() => {
    if (!searchTerm) {
      // If no search, show current category nodes
      return getNodesByCategory(selectedCategory);
    }

    // If searching, filter all nodes by search term
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allNodes.filter(
      (node) =>
        node.label.toLowerCase().includes(lowerSearchTerm) ||
        node.category.toLowerCase().includes(lowerSearchTerm)
    );
  }, [allNodes, searchTerm, selectedCategory]);

  // Filter categories based on search term (for category tabs)
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return nodeCategories;

    return nodeCategories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.nodes.some((node) =>
          node.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [nodeCategories, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchTerm(""); // Clear search when switching categories
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchTerm(""); // Clear search when closing
    }
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchTerm("");
  };

  // Removed excessive console.log to prevent re-rendering issues

  return (
    <>
      {/* Category Tabs */}
      <div className="flex items-center px-2 pt-2 pb-1">
        {/* Search Icon */}
        <button
          onClick={toggleSearch}
          className="p-2 mr-3 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          title="Search nodes"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        <div className="flex gap-2 flex-1">
          {filteredCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                selectedCategory === category.name
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Nodes Display */}
      <div className="flex-1 pt-0 pb-2 px-2 overflow-y-auto">
        <div className="flex gap-3 flex-wrap pl-12">
          {filteredNodes.map((node) => {
            // Special case for ChatGPT node: use Lucide Bot icon
            if (node.type === "customLLM") {
              const handleLLMClick = () => {
                const nodeID = getNodeID(node.type);
                const newNode = {
                  id: nodeID,
                  type: node.type,
                  position: { x: 400, y: 200 }, // Default center position
                  data: { id: nodeID, nodeType: node.type },
                };
                addNode(newNode);
              };

              // Lightweight drag fallback for accessibility
              const onDragStart = (event) => {
                const appData = { nodeType: node.type };
                event.dataTransfer.setData(
                  "application/reactflow",
                  JSON.stringify(appData)
                );
                event.dataTransfer.effectAllowed = "move";
              };

              return (
                <div
                  key={node.type}
                  className="cursor-grab min-w-[80px] h-[60px] flex items-center rounded-lg bg-white border border-gray-200 justify-center flex-col gap-1 shadow-sm hover:shadow-md transition-shadow duration-200"
                  onClick={handleLLMClick}
                  onDragStart={onDragStart}
                  draggable
                >
                  <Bot className="w-6 h-6 text-indigo-600" />
                  <span className="text-gray-700 text-xs font-medium">
                    {node.label}
                  </span>
                </div>
              );
            }
            // Default for all other nodes
            return (
              <DraggableNode
                key={node.type}
                type={node.type}
                label={node.label}
                icon={node.icon}
              />
            );
          })}
        </div>
      </div>

      {/* Search Modal Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Search Nodes
              </h3>
              <button
                onClick={closeSearch}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                title="Close search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search by category or node name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                autoFocus
              />
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {searchTerm ? (
                filteredNodes.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredNodes.map((node) => (
                      <div
                        key={node.type}
                        className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => {
                          // Switch to the node's category and close search
                          setSelectedCategory(node.category);
                          closeSearch();
                        }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Icon
                            name={node.icon}
                            className="w-8 h-8 text-indigo-600"
                          />
                          <span className="text-sm font-medium text-gray-700 text-center">
                            {node.label}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {node.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg
                      className="w-12 h-12 mx-auto mb-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <p>No nodes found matching "{searchTerm}"</p>
                  </div>
                )
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <p>Start typing to search for nodes...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NodePaletteOrganism;
