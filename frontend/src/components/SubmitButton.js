// submit.js

import { useStore } from "../store/store";

export const SubmitButton = () => {
  // Select nodes and edges from Zustand store
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      // Show the backend's num_nodes, num_edges, and is_dag in a user-friendly alert
      alert(
        `Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${
          data.is_dag ? "Yes" : "No"
        }`
      );
    } catch (error) {
      alert("Failed to submit: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        type="button"
        onClick={handleSubmit}
        className="rounded px-6 py-2 bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition-colors duration-200 font-semibold"
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitButton;
