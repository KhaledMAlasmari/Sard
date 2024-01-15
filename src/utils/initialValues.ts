import { nanoid } from 'nanoid';
import { Edge } from 'reactflow';
import { Node } from 'reactflow';
import Event from '@/models/Event';

const id = nanoid();
const initialNodes: Node[] = [
    {
        id: id,
        type: 'chapter',
        data: { name: null, image: null, title: "Chapter Title", canvas: id },
        height: 50,
        width: 50,
        position: { x: 0, y: 0 },
        hidden: true
    }
];
const initialEdges: Edge[] = [];
const initialCanvases: string[] = [id];

export {
    initialNodes,
    initialEdges,
    initialCanvases,
}
