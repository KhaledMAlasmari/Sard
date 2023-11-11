import { CSSProperties, useCallback, useState } from 'react';
import { Handle, NodeProps, NodeResizer, Position } from 'reactflow';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

import actions from '../../utils/actions'
import BaseNode from './BaseNode';
function ActionNode(props: NodeProps) {

    const [action, setAction] = useState("Action")
    const handleActionChange = (event: any, action: string) => {
        setAction(action)
    }    
    return (
        <BaseNode TextClassName="text-white text-center text-4sl font-bold"  title='Action' BodyClassName='relative w-24 h-16 bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
            <ContextMenu>
                <ContextMenuTrigger className="flex items-center justify-center h-screen text-white text-center text-4sl font-bold"  style={{ width: '100%', height: '100%' }} >
                    {action}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    {actions.map((key) => {
                        return <ContextMenuItem key={key} onClick={() => setAction(key)}>{key}</ContextMenuItem>
                    })}
                </ContextMenuContent>
            </ContextMenu>
        </BaseNode>
    );
}
export default ActionNode
