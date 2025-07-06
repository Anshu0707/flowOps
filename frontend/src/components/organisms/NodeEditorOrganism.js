import React from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

const NodeEditorOrganism = ({ selectedNode, onSave, onClose }) => {
  if (!selectedNode) return null;

  return (
    <>
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Configure {selectedNode.type.replace("custom", "")} Node
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <Icon name="XMark" className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <FormField
            label="Node ID"
            type="input"
            value={selectedNode.id}
            readOnly
            inputClassName="bg-gray-100"
          />
          <FormField
            label="Position X"
            type="input"
            value={Math.round(selectedNode.position.x)}
            readOnly
            inputClassName="bg-gray-100"
          />
          <FormField
            label="Position Y"
            type="input"
            value={Math.round(selectedNode.position.y)}
            readOnly
            inputClassName="bg-gray-100"
          />
          {/* Add more configuration fields based on node type */}
        </div>
      </div>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <Button onClick={onSave} variant="primary">
            Save Changes
          </Button>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default NodeEditorOrganism;
