// submit.js

import React, { useState } from "react";
import PipelineResultModal from "./molecules/PipelineResultModal";

export const SubmitButton = ({ flowData }) => {
  // Use flowData from props instead of Zustand store
  const nodes = flowData?.nodes || [];
  const edges = flowData?.edges || [];
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input data
    if (!nodes || nodes.length === 0) {
      setResult({
        num_nodes: 0,
        num_edges: 0,
        is_dag: false,
        error:
          "No nodes found in the flow. Please add some nodes before submitting.",
      });
      setModalOpen(true);
      return;
    }

    try {
      // Filter out OutputsNode from the nodes before sending to backend
      const filteredNodes = nodes.filter((node) => node.type !== "outputs");

      // Send ALL edges (including OutputsNode connections) to get correct count
      const response = await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL || "http://localhost:8000"
        }/pipelines/parse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nodes: filteredNodes, edges }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Server error (${response.status}): ${
            errorText || response.statusText
          }`
        );
      }

      const data = await response.json();

      // Validate response data
      if (
        !data ||
        typeof data.num_nodes !== "number" ||
        typeof data.num_edges !== "number" ||
        typeof data.is_dag !== "boolean"
      ) {
        throw new Error("Invalid response format from server");
      }

      setResult(data);
      setModalOpen(true);
    } catch (error) {
      console.error("Pipeline submission failed:", error);

      let errorMessage =
        "An unexpected error occurred while processing your pipeline.";

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        errorMessage =
          "Unable to connect to the server. Please check if the backend is running.";
      } else if (error.message.includes("Server error")) {
        errorMessage = error.message;
      } else if (error.message.includes("Invalid response format")) {
        errorMessage =
          "The server returned an invalid response. Please try again.";
      }

      setResult({
        num_nodes: 0,
        num_edges: 0,
        is_dag: false,
        error: errorMessage,
      });
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setResult(null);
  };

  return (
    <div className="flex items-center justify-center mt-2">
      <button
        type="button"
        onClick={handleSubmit}
        className="rounded px-6 py-1 bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition-colors duration-200 font-semibold"
      >
        Submit
      </button>
      <PipelineResultModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        num_nodes={result?.num_nodes}
        num_edges={result?.num_edges}
        is_dag={result?.is_dag}
      />
    </div>
  );
};

export default SubmitButton;
