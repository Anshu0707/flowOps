import { useState, useCallback } from "react";
import { useStore } from "../store/store";

export const useFlowBuilder = () => {
  // UI state only - React Flow state is handled by FlowCanvasOrganism
  const [selectedNode, setSelectedNode] = useState(null);
  const [showNodeEditor, setShowNodeEditor] = useState(false);

  // Get flow data directly from the store for accurate counts
  const flowData = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  // Event handlers - simplified for click-based workflow
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setShowNodeEditor(true);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setShowNodeEditor(false);
  }, []);

  const onFlowChange = useCallback(({ nodes, edges }) => {
    // No longer needed since we get data directly from store
    // This callback is kept for compatibility with FlowCanvasOrganism
  }, []);

  const onSaveNode = useCallback(() => {
    try {
      setShowNodeEditor(false);
      setSelectedNode(null);
    } catch (error) {
      console.error("Save operation failed:", error);
    }
  }, [selectedNode]);

  const onCloseEditor = useCallback(() => {
    setShowNodeEditor(false);
    setSelectedNode(null);
  }, []);

  return {
    // UI state
    selectedNode,
    showNodeEditor,
    flowData,

    // Actions
    onNodeClick,
    onPaneClick,
    onFlowChange,
    onSaveNode,
    onCloseEditor,
  };
};
