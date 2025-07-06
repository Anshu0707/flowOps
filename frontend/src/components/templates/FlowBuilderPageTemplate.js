import React from "react";

// Templates
import FlowCanvasTemplate from "./FlowCanvasTemplate";
import NodePaletteTemplate from "./NodePaletteTemplate";
import NodeEditorTemplate from "./NodeEditorTemplate";

// Organisms
import NodePaletteOrganism from "../organisms/NodePaletteOrganism";
import NodeEditorOrganism from "../organisms/NodeEditorOrganism";
import FlowToolbarOrganism from "../organisms/FlowToolbarOrganism";
import FlowCanvasOrganism from "../organisms/FlowCanvasOrganism";

const FlowBuilderPageTemplate = ({
  // UI state
  selectedNode,
  showNodeEditor,
  flowData,

  // Actions
  onNodeClick,
  onPaneClick,
  onFlowChange,
  onSaveNode,
  onCloseEditor,
}) => {
  return (
    <FlowCanvasTemplate
      sidebarPosition="top"
      sidebarHeight={120}
      toolbarHeight={45}
      toolbar={
        <FlowToolbarOrganism
          nodeCount={
            flowData.nodes?.filter((node) => node.type !== "outputs").length ||
            0
          }
          edgeCount={flowData.edges?.length || 0}
          flowData={flowData}
        />
      }
      sidebar={
        <NodePaletteTemplate
          header={null} // Handled by NodePaletteOrganism
          search={null} // Handled by NodePaletteOrganism
          categories={<NodePaletteOrganism />}
        />
      }
      flowArea={
        <FlowCanvasOrganism
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onFlowChange={onFlowChange}
        />
      }
    />
  );
};

export default FlowBuilderPageTemplate;
