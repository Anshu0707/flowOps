import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";

const ConditionNode = ({ id, data }) => {
  const handles = [
    { type: "target", position: Position.Left, id: `${id}-in` },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-true`,
      style: { top: "40%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-false`,
      style: { top: "70%" },
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Condition"
      handles={handles}
      width={220}
      height={110}
    >
      <div className="flex flex-col w-full gap-2">
        <label
          htmlFor={`${id}-condition-input`}
          className="text-xs font-medium text-gray-700"
        >
          Condition
        </label>
        <input
          id={`${id}-condition-input`}
          type="text"
          className="border rounded px-2 py-1 text-sm w-full"
          placeholder="Enter condition..."
          readOnly
        />
      </div>
    </BaseNode>
  );
};

export default ConditionNode;
