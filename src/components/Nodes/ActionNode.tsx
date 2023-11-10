import { CSSProperties, useCallback, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';


function ActionNode(props: NodeProps) {
    const [name, setName] = useState("");
    const onChange = useCallback((evt: any) => {
        setName(evt.target.value)
        console.log(name)
    }, [name]);

    return (
        <div style={{width: '50px'}}>
            <Handle type="target" position={Position.Top} />
            <div>
                <label style={style} htmlFor="action">Action</label>
                <input style={{width: '50px'}} id="text" name="action" value={name} onChange={onChange} className="nodrag" />
            </div>
            <Handle type="source" position={Position.Bottom}  />
        </div>
    );
}

const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
}
export default ActionNode
