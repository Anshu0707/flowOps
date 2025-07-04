import { useState } from "react";
import BaseNode from "../components/BaseNode";
import Icon from "../components/atoms/Icon";
import Text from "../components/atoms/Text";
import Input from "../components/atoms/Input";
import Select from "../components/atoms/Select";
import Label from "../components/atoms/Label";
import { Position } from "reactflow";

export const InputNode = ({ id, data }) => {
  // Add state for name and type
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  // Define handles
  const handles = [
    { type: "source", position: Position.Right, id: `${id}-value` },
  ];

  return (
    <BaseNode
      id={id}
      title={
        <div className="flex items-center gap-2">
          <Icon name="ArrowRight" className="w-5 h-5 text-indigo-600" />
          <Text variant="h3" weight="bold">
            Input
          </Text>
        </div>
      }
      handles={handles}
      width={220}
      minHeight={110}
    >
      <div className="flex flex-col gap-3 w-full">
        <Label>
          Name:
          <Input
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            placeholder="Enter name..."
          />
        </Label>
        <Label>
          Type:
          <Select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </Select>
        </Label>
      </div>
    </BaseNode>
  );
};

export default InputNode;
