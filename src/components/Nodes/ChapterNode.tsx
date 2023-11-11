import { Handle, NodeProps, Position, Node, useNodeId } from 'reactflow';
import useStore from '@/utils/nodeStore';
import nodeTypes from '../../utils/NodeTypes'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import BaseNode from './BaseNode';

export type ChapterPropsType = {
    title: string;
};

function ChapterNode({ data }: NodeProps<ChapterPropsType>) {
    const addChildNode = useStore((state) => state.addChildNode);
    const id = useNodeId()
    const handleAddingNode = (type: string) => {
        addChildNode(id, { x: 50, y: 50 }, type)
    }
    return (
        <BaseNode uploadIsAllowed={true} TextClassName="text-white text-center text-4xl font-bold m-2" title='Chapter' BodyClassName='relative w-96 h-96 bg-pink-800 rounded-lg shadow-lg overflow-hidden'>
            <ContextMenu>
                <ContextMenuTrigger style={{ display: 'block', width: '100%', height: '100%' }} >
                </ContextMenuTrigger>
                <ContextMenuContent>
                    {Object.keys(nodeTypes).map((key) => {
                        if (key != 'chapter') {
                            return <ContextMenuItem onClick={() => handleAddingNode(key)} style={{ textTransform: 'capitalize' }} key={key}>{key}</ContextMenuItem>
                        }
                    })}
                </ContextMenuContent>
            </ContextMenu>
        </BaseNode>

    );
};

export default ChapterNode;
