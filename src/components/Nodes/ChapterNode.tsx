import { Handle, NodeProps, Position, Node, useNodeId } from 'reactflow';
import useStore from '@/utils/nodeStore';
import nodeTypes from '../../utils/NodeTypes'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

export type ChapterPropsType = {
    title: string;
};

function ChapterNode({ data }: NodeProps<ChapterPropsType>) {
    const addChildNode = useStore((state) => state.addChildNode);
    const id = useNodeId()
    return (
        <div style={{
            width: 200,
            height: 200,
            background: 'lightpink',
            borderRadius: 8,
        }}>
            <Handle type="target" position={Position.Top} />
            <ContextMenu>
                <ContextMenuTrigger style={{ display: 'block', width: '100%', height: '100%' }} >
                </ContextMenuTrigger>

                <ContextMenuContent>
                    {Object.keys(nodeTypes).map((key) => {

                        return <ContextMenuItem onClick={(evt) => { addChildNode(id, { x: 50, y: 50 }, key) }} style={{ textTransform: 'capitalize' }} key={key}>{key}</ContextMenuItem>
                    })}
                </ContextMenuContent>
            </ContextMenu>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default ChapterNode;
