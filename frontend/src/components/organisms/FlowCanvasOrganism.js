import React, { useRef, useState, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "../../store/store";
import { shallow } from "zustand/shallow";
import InputNodeOrganism from "./InputNodeOrganism";
import OutputNodeOrganism from "./OutputNodeOrganism";
import LLMNodeOrganism from "./LLMNodeOrganism";
import TextNodeOrganism from "./TextNodeOrganism";
import TransformNodeOrganism from "./TransformNodeOrganism";
import FilterNodeOrganism from "./FilterNodeOrganism";
import ConditionNodeOrganism from "./ConditionNodeOrganism";
import DelayNodeOrganism from "./DelayNodeOrganism";
import CommentNodeOrganism from "./CommentNodeOrganism";
import OutputsNodeOrganism from "./OutputsNodeOrganism";

import { edgeTypes } from "../../features/flow-edges";
import "reactflow/dist/style.css";

const nodeTypes = {
  customInput: InputNodeOrganism,
  customOutput: OutputNodeOrganism,
  customLLM: LLMNodeOrganism,
  customText: TextNodeOrganism,
  customTransform: TransformNodeOrganism,
  customFilter: FilterNodeOrganism,
  customCondition: ConditionNodeOrganism,
  customDelay: DelayNodeOrganism,
  customComment: CommentNodeOrganism,
  outputs: OutputsNodeOrganism,
};

// Edge types are now imported from features/flow-edges

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const gridSize = 20;
const proOptions = { hideAttribution: true };

const FlowCanvasOrganism = ({ onNodeClick, onPaneClick, onFlowChange }) => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );

  // Removed onDrop function - no longer needed with click-to-add functionality

  // Function to update OutputsNode position when TextNode moves
  const updateOutputsNodePosition = useCallback(
    (textNodeId, textNodePosition) => {
      if (
        !textNodePosition ||
        typeof textNodePosition.x === "undefined" ||
        typeof textNodePosition.y === "undefined"
      ) {
        return;
      }

      const { nodes } = useStore.getState();
      const outputsNodeId = `outputs-${textNodeId}`;
      const textNode = nodes.find((node) => node.id === textNodeId);

      if (textNode) {
        const textNodeWidth = textNode.width || 200; // Default width if not set
        const outputsNode = nodes.find((node) => node.id === outputsNodeId);

        if (outputsNode) {
          const outputsNodeWidth = outputsNode.width || 300; // Default width
          const updatedNodes = nodes.map((node) =>
            node.id === outputsNodeId
              ? {
                  ...node,
                  position: {
                    x: textNodePosition.x - outputsNodeWidth, // Left side with no gap
                    y: textNodePosition.y,
                  },
                }
              : node
          );
          useStore.setState({ nodes: updatedNodes });
        }
      }
    },
    []
  );

  return (
    <div className="w-screen h-[70vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) => {
          onNodesChange(changes);

          // Check if any TextNode was moved and update its OutputsNode
          // Only process position changes to avoid unnecessary updates
          const positionChanges = changes.filter(
            (change) =>
              change.type === "position" &&
              change.position &&
              typeof change.position.x === "number" &&
              typeof change.position.y === "number"
          );

          if (positionChanges.length > 0) {
            positionChanges.forEach((change) => {
              try {
                const movedNode = nodes.find((node) => node.id === change.id);
                if (movedNode && movedNode.type === "customText") {
                  updateOutputsNodePosition(change.id, change.position);
                }
              } catch (error) {
                console.error("Error processing node change:", error, change);
              }
            });
          }

          // Debounced flow change callback
          const timeoutId = setTimeout(() => {
            if (onFlowChange) {
              const { nodes, edges } = useStore.getState();
              onFlowChange({ nodes, edges });
            }
          }, 100);

          // Cleanup timeout
          return () => clearTimeout(timeoutId);
        }}
        onEdgesChange={(changes) => {
          onEdgesChange(changes);
          // Debounced flow change callback
          const timeoutId = setTimeout(() => {
            if (onFlowChange) {
              const { nodes, edges } = useStore.getState();
              onFlowChange({ nodes, edges });
            }
          }, 100);

          // Cleanup timeout
          return () => clearTimeout(timeoutId);
        }}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvasOrganism;
