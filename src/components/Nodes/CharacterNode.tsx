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
        <BaseNode TextClassName='' title='' BodyClassName="bg-gray-800 p-1 rounded-lg shadow-lg">
            <div >
                <h1 className="text-xs text-center text-white font-bold mb-2">Character</h1>
                <div className="flex items-center justify-center mb-2">
                    <input
                        type="text"
                        className="w-32 bg-gray-700 text-white py-1 px-1 rounded-md"
                        placeholder="Name"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-gray-700 w-24 h-6 text-xs text-white py-1 px-1 rounded-md mr-2">Upload Image</button>
                    <button className="bg-gray-700 w-24 h-6 text-xs text-white py-1 px-1 rounded-md">Preview</button>
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
