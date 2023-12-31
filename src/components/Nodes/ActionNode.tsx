
import React, { useState } from 'react';
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
    const nodeId = useNodeId();
    const changeNodeData = useStore(state => state.changeNodeData);
    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState(props?.data?.name || '');

    const handleCustomAction = () => {
        setIsEditable(true);
    };

    const handleBlur = () => {
        setIsEditable(false);
        changeNodeData(nodeId!, { name: inputValue });
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.currentTarget.blur();
        }
    };

    const onClick = (name: string) => {
        if (name === 'Custom') {
            handleCustomAction();
        } else {
            changeNodeData(nodeId!, { name: name });
        }
    };
    const inputStyles: React.CSSProperties = {
        width: '8rem', // w-32
        backgroundColor: '#2D3748', // bg-gray-700
        color: 'white', // text-white
        padding: '0.25rem 0.25rem', // py-1 px-1
        borderRadius: '0.375rem', // rounded-md
    };

    return (
        <BaseNode nodeData={props.data} uploadIsAllowed={false} TextClassName="text-white text-center text-4sl font-bold" title='Action' BodyClassName='relative w-24 h-16 bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
            <ContextMenu>
                <ContextMenuTrigger className="flex items-center justify-center h-screen text-white text-center text-4sl font-bold" style={{ width: '100%', height: '100%' }} >
                    {!isEditable ? (
                        props?.data?.name || "Action"
                    ) : (

                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onBlur={handleBlur}
                                onKeyPress={handleKeyPress}
                                autoFocus
                                className="w-20 bg-gray-700 text-white py-1 px-1 rounded-md" // Added ml-4 for left margin
                                placeholder="Action"
                            />
                    )}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    {actions.map((key) => (
                        <ContextMenuItem key={key} onClick={() => onClick(key)}>
                            {key}
                        </ContextMenuItem>
                    ))}
                    <ContextMenuItem onClick={() => onClick('Custom')}>
                        Custom
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </BaseNode>
    );
}

export default ActionNode;