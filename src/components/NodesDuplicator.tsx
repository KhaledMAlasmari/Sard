import React from 'react';
import onDragStart from '@/utils/dragDataTransfer';
import { useNodes } from 'reactflow';
import { ScrollArea } from "@/components/ui/scroll-area"
interface NodesDuplicatorProps {
}

const NodesDuplicator: React.FC<NodesDuplicatorProps> = () => {
    // @ts-ignore
    const nodes = Object.values(useNodes().reduce((acc, obj) => ({ ...acc, [obj.data.name]: obj }), {})).sort((a, b) => {return a.type.localeCompare(b.type)})

    return (
        <div className='h-screen'>
            <h1 className="text-2xl font-bold text-center p-1">Created elements</h1>
            <ScrollArea className='flex flex-row  flex-wrap h-5/6'>
                <div className='flex flex-col items-center justify-center mb-16'>
                    {
                        nodes.map((node) => {
                            // @ts-ignore
                            const name = node.data.name
                            // @ts-ignore
                            if (node.type !== 'chapter' && name) {
                                return (
                                    <div
                                        // @ts-ignore
                                        key={node.id}
                                        className="flex items-center justify-around w-40 h-12 bg-gray-800 rounded-lg cursor-pointer m-2 text-ellipsis overflow-hidden break-words"
                                        draggable
                                        // @ts-ignore
                                        onDragStart={(event) => onDragStart(event, JSON.stringify({height: node.height, width: node.width, type: "copy", node_info: { type: node.type, data: node.data } }))}
                                    >
                                        <div className='flex-1 text-center'>{name}</div>
                                        { /* @ts-ignore */}
                                        <img className='w-8 h-8 mr-2' src={`icons/${node.type}.png`}></img>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </ScrollArea>
        </div>
    );
};

export default NodesDuplicator;
