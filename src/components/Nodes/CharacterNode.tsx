import { CSSProperties, SetStateAction, useCallback, useState } from 'react';
import { Handle, NodeProps, Position, useNodeId, useNodes, useReactFlow, Node } from 'reactflow';
import BaseNode from './BaseNode';
import useStore from '@/utils/nodeStore';


export type ChapterPropsType = {
    node: Node;
};


function CharacterNode(props: NodeProps) {
    const nodeId = useNodeId()
    const changeNodeData = useStore(state => state.changeNodeData)
    const onChange = (evt: any) => {
        console.log(evt.target.value)
        changeNodeData(nodeId!, { name: evt.target.value })
    }

    return (
        <BaseNode uploadIsAllowed={true} TextClassName='' title='' BodyClassName="bg-gray-800 p-1 rounded-lg shadow-lg">
            <div >
                <h1 className="text-xs text-center text-white font-bold mr-2">Character</h1>
                <div className="flex items-center justify-center mb-2">
                    <input
                        type="text"
                        className="w-32 bg-gray-700 text-white py-1 px-1 rounded-md"
                        placeholder="Name"
                        onInput={onChange}
                        value={props?.data?.name||""}
                    />
                </div>
            </div>
        </BaseNode>
    );
}

const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
}
export default CharacterNode
