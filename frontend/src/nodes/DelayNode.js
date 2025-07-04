import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";

const DelayNode = ({ id }) => {
  const handles = [
    { type: "target", position: Position.Left, id: `${id}-in` },
    { type: "source", position: Position.Right, id: `${id}-out` },
  ];

  return (
    <BaseNode id={id} title="Delay" handles={handles} width={180} height={80}>
      <div className="flex flex-col gap-2 w-full items-center">
        <label className="text-xs font-medium text-gray-700">
          Delay (s):
          <input
            type="number"
            min="0"
            defaultValue={1}
            className="ml-2 px-2 py-1 border border-gray-300 rounded w-20 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-200"
            readOnly
          />
        </label>
      </div>
    </BaseNode>
  );
};

export default DelayNode;
