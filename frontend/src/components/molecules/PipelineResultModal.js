import React from "react";
import Modal from "../atoms/Modal";

const PipelineResultModal = ({
  isOpen,
  onClose,
  num_nodes,
  num_edges,
  is_dag,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        {/* Header with icon and color */}
        <div
          className={`w-full flex flex-col items-center rounded-t-xl mb-2 pt-6 pb-4 px-6 ${
            is_dag ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {is_dag ? (
            <svg
              className="w-14 h-14 text-green-500 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2l4 -4"
              />
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          ) : (
            <svg
              className="w-14 h-14 text-red-500 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01"
              />
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          )}
          <h2
            className={`text-2xl font-extrabold text-center w-full mt-2 ${
              is_dag ? "text-green-700" : "text-red-700"
            }`}
          >
            Pipeline Analysis Result
          </h2>
        </div>
        {/* Badges for numbers */}
        <div className="flex gap-6 mt-2 mb-2">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 font-bold uppercase">
              NODES
            </span>
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg shadow">
              {num_nodes}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 font-bold uppercase">
              EDGES
            </span>
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg shadow">
              {num_edges}
            </span>
          </div>
        </div>
        {/* DAG status */}
        <div className="flex items-center gap-2 mt-2 mb-2">
          <span className="font-semibold text-gray-700">Is DAG:</span>
          <span
            className={`px-3 py-1 rounded-full font-bold text-base shadow ${
              is_dag ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            }`}
          >
            {is_dag ? "Yes" : "No"}
          </span>
        </div>
        <button
          className="mt-4 px-8 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      {/* Animation keyframes */}
      <style>{`
        .animate-fade-in {
          animation: fadeInScale 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </Modal>
  );
};

export default PipelineResultModal;
