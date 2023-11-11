import { CSSProperties, useCallback, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import BaseNode from './BaseNode';


function CharacterNode(props: NodeProps) {
    const [name, setName] = useState("");
    const onChange = useCallback((evt: any) => {
        setName(evt.target.value)
        console.log(name)
    }, [name]);

    return (
        <BaseNode uploadIsAllowed={true} TextClassName='' title='' BodyClassName="bg-gray-800 p-1 rounded-lg shadow-lg">
            <div >
                <h1 className="text-xs text-center text-white font-bold mr-2">Character</h1>
                <div className="flex items-center justify-center mb-2">
                    <input
                        type="text"
                        className="w-32 bg-gray-700 text-white py-1 px-1 rounded-md"
                        placeholder="Name"
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
