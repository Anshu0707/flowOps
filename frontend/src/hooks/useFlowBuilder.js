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

  // Event handlers - all using useCallback for consistency
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setShowNodeEditor(true);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setShowNodeEditor(false);
  }, []);

  const onDragStart = useCallback((event, nodeType) => {
    try {
      if (!event || !nodeType) {
        console.error("Invalid drag start parameters:", { event, nodeType });
        return;
      }

      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.effectAllowed = "move";
    } catch (error) {
      console.error("Drag start failed:", error);
    }
  }, []);

  const onDragOver = useCallback((event) => {
    try {
      if (!event) {
        console.error("Invalid drag over event");
        return;
      }

      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    } catch (error) {
      console.error("Drag over failed:", error);
    }
  }, []);

  const onDrop = useCallback((event) => {
    try {
      if (!event) {
        console.error("Invalid drop event");
        return;
      }

      event.preventDefault();
      // The drop logic is handled by React Flow internally
      // We just need to prevent default and let React Flow handle it
    } catch (error) {
      console.error("Drop operation failed:", error);
    }
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
    onDragStart,
    onDragOver,
    onDrop,
    onFlowChange,
    onSaveNode,
    onCloseEditor,
  };
};
