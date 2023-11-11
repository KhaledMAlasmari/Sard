import useStore from '@/utils/nodeStore';
import {
  Handle,
  Position,
  useUpdateNodeInternals,
  NodeResizer,
  useNodeId,
  useReactFlow,
} from 'reactflow';
type Props = {
  children: JSX.Element,
  BodyClassName: string,
  TextClassName: string,
  title: string
};
function BaseNode({ children, BodyClassName, TextClassName, title}: Props) {
  const nodeId = useNodeId()
  const instance = useReactFlow();
  const deleteNode = () => {
    instance.deleteElements({ nodes: [{ id: nodeId! }] });
    console.log(instance.getNodes());
    console.log(instance.getEdges());
  }
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div className={BodyClassName}>
        <button onClick={deleteNode} className={`absolute top-2 right-2 p-1 rounded-full bg-red-500 hover:bg-red-600 transition-colors`}>
        </button>
        {children}
      </div>
      <Handle type="source" position={Position.Bottom} />

    </ div>

  )
}

export default BaseNode
