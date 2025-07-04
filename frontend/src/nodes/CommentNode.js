import BaseNode from "../components/BaseNode";

const CommentNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Comment" handles={[]} width={240} height={140}>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-xs font-medium text-gray-700 mb-1">Note:</label>
        <textarea
          className="w-full h-24 p-2 rounded bg-yellow-100 border border-yellow-300 text-sm resize-none focus:outline-none"
          placeholder="Add your comment here..."
          readOnly
        />
      </div>
    </BaseNode>
  );
};

export default CommentNode;
