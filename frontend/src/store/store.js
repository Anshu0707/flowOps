import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "animated",
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
  getNodeWidth: (nodeId) => {
    const node = get().nodes.find((node) => node.id === nodeId);
    return node?.width || 200; // Default width if not found
  },
  removeNode: (nodeId) => {
    const currentState = get();

    // Remove the node
    const updatedNodes = currentState.nodes.filter(
      (node) => node.id !== nodeId
    );

    // If it's a text node, also remove its attached outputs node
    const removedNode = currentState.nodes.find((node) => node.id === nodeId);
    if (removedNode?.type === "customText") {
      const outputsNodeId = `outputs-${nodeId}`;
      const finalNodes = updatedNodes.filter(
        (node) => node.id !== outputsNodeId
      );

      // Remove all edges connected to this node and its outputs node
      const updatedEdges = currentState.edges.filter(
        (edge) =>
          edge.source !== nodeId &&
          edge.target !== nodeId &&
          edge.source !== outputsNodeId &&
          edge.target !== outputsNodeId
      );

      set({
        nodes: finalNodes,
        edges: updatedEdges,
      });
    } else {
      // Remove all edges connected to this node
      const updatedEdges = currentState.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );

      set({
        nodes: updatedNodes,
        edges: updatedEdges,
      });
    }
  },
}));
