import ReactFlow, {
    Controls,
    Background,
    MiniMap,
    Panel,
} from 'reactflow';

import nodeTypes from '../utils/NodeTypes'

import 'reactflow/dist/style.css';
import useStore from '../utils/nodeStore';
import { shallow } from 'zustand/shallow';
import Sidebar from '@/components/Sidebar';

const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

function Canvas() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

    return (
        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            fitView
        >
            <Background />
            <Controls />
            <MiniMap />
        </ReactFlow>
    )
}

export default Canvas;
