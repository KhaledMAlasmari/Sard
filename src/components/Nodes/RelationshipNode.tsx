import { CSSProperties, useCallback, useState } from 'react';
import { Handle, NodeProps, NodeResizer, Position, useNodeId } from 'reactflow';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

import relationships from '../../utils/relationships'
import BaseNode from './BaseNode';
import useStore from '@/utils/nodeStore';
function RelationshipNode(props: NodeProps) {
    const nodeId = useNodeId();
    const changeNodeData = useStore(state => state.changeNodeData);
    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState(props?.data?.name || '');

    const handleCustomRelation = () => {
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
            handleCustomRelation();
        } else {
            changeNodeData(nodeId!, { name: name });
        }
    };

    const changeInputValue = (event: { target: { value: any; }; }) => {
        setInputValue(event.target.value)
    }
    const inputStyles: React.CSSProperties = {
        width: '8rem', // w-32
        backgroundColor: '#2D3748', // bg-gray-700
        color: 'white', // text-white
        padding: '0.25rem 0.25rem', // py-1 px-1
        borderRadius: '0.375rem', // rounded-md
    };

    return (
        <BaseNode nodeData={props.data} uploadIsAllowed={false} TextClassName="text-white text-center text-4sl font-bold" title='Relationship' BodyClassName='relative w-24 h-16 bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
            <ContextMenu>
                <ContextMenuTrigger className="flex items-center justify-center h-screen text-white text-center text-4sl font-bold" style={{ width: '100%', height: '100%' }} >
                    {!isEditable ? (
                        props?.data?.name || "Relationship"
                    ) : (

                        <input
                            type="text"
                            value={inputValue}
                            onChange={changeInputValue}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyPress}
                            autoFocus
                            className="w-20 bg-gray-700 text-white py-1 px-1 rounded-md" // Added ml-4 for left margin
                            placeholder="Relation"
                        />
                    )}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    {relationships.map((key) => {
                        return (
                            <ContextMenuItem key={key} onClick={() => onClick(key)}>
                                {key}
                            </ContextMenuItem>
                        )
                    })}
                    <ContextMenuItem key='custom' onClick={() => onClick('Custom')}>
                        Custom
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </BaseNode>
    );
}

export default RelationshipNode;
