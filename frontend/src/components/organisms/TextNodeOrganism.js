import React, { useState, useEffect, useMemo, useRef } from "react";
import { Position, useReactFlow } from "reactflow";
import { shallow } from "zustand/shallow";
import BaseNode from "../BaseNode";
import FormField from "../molecules/FormField";
import { parseVariables } from "../../utils/parseVariables";
import { useStore } from "../../store/store";
import { designTokens } from "../../utils/styles";

const TextNodeOrganism = ({ id, data }) => {
  // Text-specific state
  const [text, setText] = useState(data?.text || "");
  const { addNode, removeNode, getNodeWidth, nodes } = useStore(
    (state) => ({
      addNode: state.addNode,
      removeNode: state.removeNode,
      getNodeWidth: state.getNodeWidth,
      nodes: state.nodes,
    }),
    shallow
  );
  const { setNodes } = useReactFlow();
  const debounceRef = useRef(null);
  const previousVariablesRef = useRef([]);

  // Parse variables from text input with memoization
  const variables = useMemo(() => {
    const parsed = parseVariables(text);
    // console.log("Parsed variables:", parsed, "from text:", text);
    return parsed;
  }, [text]);

  // Memoize the variables string for comparison to avoid unnecessary JSON.stringify calls
  const variablesString = useMemo(() => JSON.stringify(variables), [variables]);

  // Dynamic sizing based on text content
  const [nodeWidth, setNodeWidth] = useState(260);
  const [nodeHeight, setNodeHeight] = useState(110);

  useEffect(() => {
    // Calculate width based on text length using design tokens
    const minWidth = parseInt(designTokens.sizes.node.minWidth);
    const maxWidth = parseInt(designTokens.sizes.node.maxWidth);
    const charWidth = 8; // Approximate character width
    const calculatedWidth = Math.max(
      320, // Increased minimum width for TextNode
      Math.min(maxWidth, text.length * charWidth + 40)
    );
    setNodeWidth(calculatedWidth);

    // Calculate height based on text lines - with maximum height limit
    const lines = text.split("\n").length;
    const minHeight = parseInt(designTokens.sizes.node.minHeight);
    const maxHeight = 400; // Maximum height before scrollbar
    const lineHeight = 20;
    const calculatedHeight = Math.max(
      minHeight,
      Math.min(lines * lineHeight + 80, maxHeight)
    );
    setNodeHeight(calculatedHeight);

    // Update the node's width using ReactFlow's setNodes
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return { ...node, width: calculatedWidth };
        }
        // Also update the corresponding OutputsNode width
        if (node.id === `outputs-${id}`) {
          const outputsWidth = parseInt(designTokens.sizes.node.outputsWidth);
          return {
            ...node,
            width: outputsWidth,
            style: { ...node.style, width: outputsWidth },
          };
        }
        return node;
      })
    );
  }, [text, id]);

  // Create and manage attached OutputsNode when variables are detected
  useEffect(() => {
    // Clear any existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce the node management to avoid processing while user is still typing
    debounceRef.current = setTimeout(() => {
      try {
        const existingNodes = nodes;

        // Get the current TextNode to calculate position
        const textNode = existingNodes.find((node) => node.id === id);
        if (!textNode) {
          // console.warn(`TextNode with id ${id} not found`);
          return;
        }

        // Validate textNode position
        if (
          !textNode.position ||
          typeof textNode.position.x !== "number" ||
          typeof textNode.position.y !== "number"
        ) {
          console.error("Invalid TextNode position:", textNode.position);
          return;
        }

        // Get outputs node id
        const outputsNodeId = `outputs-${id}`;
        // Remove existing OutputsNode (if any)
        removeNode(outputsNodeId);

        // Add new OutputsNode if there are variables
        if (variables.length > 0) {
          const textNodeWidth =
            getNodeWidth(id) || parseInt(designTokens.sizes.node.defaultWidth); // Fallback width
          const outputsNodeWidth = parseInt(
            designTokens.sizes.node.outputsWidth
          );
          const outputsNodePosition = {
            x: textNode.position.x - outputsNodeWidth, // Left side with no gap
            y: textNode.position.y,
          };
          const outputsNode = {
            id: outputsNodeId,
            type: "outputs",
            position: outputsNodePosition,
            data: { variables },
            width: parseInt(designTokens.sizes.node.outputsWidth),
            style: {
              width: parseInt(designTokens.sizes.node.outputsWidth),
            },
            draggable: false,
            zIndex: designTokens.zIndex.handle,
          };
          addNode(outputsNode);
        }

        previousVariablesRef.current = variablesString;
      } catch (error) {
        console.error("Error in OutputsNode management:", error);
      }
    }, parseInt(designTokens.timing.debounce));

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [
    variables,
    id,
    addNode,
    removeNode,
    getNodeWidth,
    nodes,
    variablesString,
  ]);

  // Clean up outputs node when this text node is deleted
  useEffect(() => {
    return () => {
      try {
        const outputsNodeId = `outputs-${id}`;
        const currentState = useStore.getState();
        const existingNodes = currentState.nodes;

        // Remove the outputs node if it exists
        const outputsNodeExists = existingNodes.some(
          (node) => node.id === outputsNodeId
        );

        if (outputsNodeExists) {
          removeNode(outputsNodeId);
        }
      } catch (error) {
        console.error("Error in cleanup:", error);
      }
    };
  }, [id, removeNode, useStore]);

  // Create a single output handle on the right side of TextNode
  const handles = useMemo(() => {
    return [
      {
        type: "source",
        position: Position.Right,
        id: `${id}-output`,
        style: { top: "50%" },
      },
    ];
  }, [id]);

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="DocumentText"
      description="Create and format text content with variable support"
      width={nodeWidth}
      minHeight={nodeHeight}
      handles={handles}
    >
      <div className="flex flex-col gap-3 w-full">
        <FormField
          label="Text:"
          type="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text... Use {{variable}} for dynamic inputs"
          inputClassName="resize-none"
        />
        {variables.length > 0 && (
          <div className="text-xs text-gray-600">
            Variables: {variables.join(", ")}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default TextNodeOrganism;
