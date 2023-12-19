import { Handle, NodeProps, Position, Node, useNodeId, NodeResizer } from 'reactflow';
import useStore from '@/utils/nodeStore';
import nodeTypes from '../../utils/NodeTypes'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import BaseNode from './BaseNode';
import { useState } from 'react';

function ChapterNode({ data }: NodeProps) {
    const id = useNodeId()

    return (
        <>
            <BaseNode uploadIsAllowed={true} TextClassName="text-white text-center text-4xl font-bold m-2" title='Chapter' BodyClassName='h-96 w-96 p-auto bg-pink-800 rounded-lg shadow-lg chapter'>
                <span />
            </BaseNode>
        </>
    );
};

export default ChapterNode;
