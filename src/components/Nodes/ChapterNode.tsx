import { Handle, NodeProps, Position, Node, useNodeId, NodeResizer } from 'reactflow';
import BaseNode from './BaseNode';

function ChapterNode({ data }: NodeProps) {
    const id = useNodeId()

    return (
        <>
            <BaseNode nodeData={data}  uploadIsAllowed={true} TextClassName="text-white text-center text-4xl font-bold m-2" title='Chapter' BodyClassName='h-96 w-96 p-auto bg-pink-800 rounded-lg shadow-lg chapter'>
                <span />
            </BaseNode>
        </>
    );
};

export default ChapterNode;
