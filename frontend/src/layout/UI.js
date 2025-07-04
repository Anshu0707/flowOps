// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "../store/store";
import { shallow } from "zustand/shallow";
import { InputNode } from "../nodes/InputNode";
import { LLMNode } from "../nodes/LLMNode";
import { OutputNode } from "../nodes/OutputNode";
import { TextNode } from "../nodes/TextNode";
import FilterNode from "../nodes/FilterNode";
import DelayNode from "../nodes/DelayNode";
import CommentNode from "../nodes/CommentNode";
import ConditionNode from "../nodes/ConditionNode";
import TransformNode from "../nodes/TransformNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  delay: DelayNode,
  comment: CommentNode,
  condition: ConditionNode,
  transform: TransformNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // 1. Add a handler to manage variable nodes
  const handleVariablesChange = useCallback(
    (variables, textNodeId, type) => {
      // Find the TextNode's position
      const textNode = nodes.find((n) => n.id === textNodeId);
      if (!textNode) return;

      // For each variable, ensure an OutputNode exists
      variables.forEach((variable, idx) => {
        const outputNodeId = `output-for-${textNodeId}-${variable}`;
        if (!nodes.some((n) => n.id === outputNodeId)) {
          // Position to the left of the TextNode, spaced vertically if multiple
          const position = {
            x: textNode.position.x - 260,
            y: textNode.position.y + idx * 140,
          };
          addNode({
            id: outputNodeId,
            type: "customOutput",
            position,
            data: {
              outputName: variable,
              outputType: type, // "Text" or "Image"
            },
          });
        }
      });

      // Remove OutputNodes for variables that no longer exist
      nodes
        .filter((n) => n.id.startsWith(`output-for-${textNodeId}-`))
        .forEach((n) => {
          const variable = n.id.replace(`output-for-${textNodeId}-`, "");
          if (!variables.includes(variable)) {
            // Remove node logic here (implement removeNode in your store)
            // removeNode(n.id);
          }
        });
    },
    [nodes, addNode /*, removeNode*/]
  );

  // 2. Pass the handler to TextNode via data
  const nodesWithHandlers = nodes.map((node) => {
    if (node.type === "text") {
      return {
        ...node,
        data: {
          ...node.data,
          onVariablesChange: handleVariablesChange,
        },
      };
    }
    return node;
  });

  return (
    <>
      <div
        ref={reactFlowWrapper}
        className="w-full h-[70vh] bg-gray-100 rounded-xl shadow-inner p-4"
      >
        <ReactFlow
          nodes={nodesWithHandlers}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
};

export default PipelineUI;
