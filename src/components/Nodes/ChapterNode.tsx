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
    return (
        <BaseNode uploadIsAllowed={true} TextClassName="text-white text-center text-4xl font-bold m-2" title='Chapter' BodyClassName='relative w-96 h-96 bg-pink-800 rounded-lg shadow-lg overflow-hidden chapter'>
            <div></div>
        </BaseNode>

    );
};

export default ChapterNode;
