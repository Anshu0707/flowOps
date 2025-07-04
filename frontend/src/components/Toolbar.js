// toolbar.js

import { DraggableNode } from "./DraggableNode";

export const PipelineToolbar = () => {
  return (
    <div className="p-4">
      <div className="mt-5 flex flex-wrap gap-3">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="delay" label="Delay" />
        <DraggableNode type="comment" label="Comment" />
        <DraggableNode type="condition" label="Condition" />
        <DraggableNode type="transform" label="Transform" />
      </div>
    </div>
  );
};

export default PipelineToolbar;
