import { CSSProperties, useCallback, useState } from 'react';
import { Handle, NodeProps, NodeResizer, Position, useNodeId } from 'reactflow';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

import actions from '../../utils/actions'
import BaseNode from './BaseNode';
import useStore from '@/utils/nodeStore';
function ActionNode(props: NodeProps) {
    const nodeId = useNodeId()
    const changeNodeData = useStore(state => state.changeNodeData)
    const onClick = (name: string) => {
        changeNodeData(nodeId!, { name: name })
    }
    return (
        <BaseNode nodeData={props.data} uploadIsAllowed={false} TextClassName="text-white text-center text-4sl font-bold"  title='Action' BodyClassName='relative w-24 h-16 bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
            <ContextMenu>
                <ContextMenuTrigger className="flex items-center justify-center h-screen text-white text-center text-4sl font-bold"  style={{ width: '100%', height: '100%' }} >
                    {props?.data?.name||"Action"}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    {actions.map((key) => {
                        return <ContextMenuItem key={key} onClick={()=> onClick(key)}>{key}</ContextMenuItem>
                    })}
                </ContextMenuContent>
            </ContextMenu>
        </BaseNode>
    );
}
export default ActionNode
