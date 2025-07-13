import React from "react";

// Template
import FlowBuilderPageTemplate from "../components/templates/FlowBuilderPageTemplate";

// Custom Hook
import { useFlowBuilder } from "../hooks/useFlowBuilder";

const FlowBuilderPage = () => {
  // All business logic and side effects handled by custom hook
  const flowBuilderData = useFlowBuilder();

  // Pure composition - just pass data to template
  return (
    <FlowBuilderPageTemplate {...flowBuilderData}>
      <h1>FlowOps</h1>
    </FlowBuilderPageTemplate>
  );
};

export default FlowBuilderPage;
