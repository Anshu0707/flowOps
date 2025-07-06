import React from "react";
import FlowBuilderPage from "./pages/FlowBuilderPage";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <FlowBuilderPage />
    </ErrorBoundary>
  );
}

export default App;
