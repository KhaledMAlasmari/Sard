import { useCallback } from "react";
import { Connection, getOutgoers, useReactFlow, Node, Edge } from "reactflow";

const connectionHasCycle = (connection: Connection, nodes: Node<any>[], edges: Edge<any>[]) => {
    // we are using getNodes and getEdges helpers here
    // to make sure we create isValidConnection function only once
    const target = nodes.find((node) => node.id === connection.target);
    const hasCycle = (node: Node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
            if (outgoer.id === connection.source) return true;
            if (hasCycle(outgoer, visited)) return true;
        }
    };
    if (target) {
        if (target.id === connection.source) return false;
        return !hasCycle(target);
    }
}


const isValidEdge = (connection: Connection, nodes: Node<any>[], edges: Edge[]) => {
    const sourceNode = nodes.find((node) => node.id === connection.source);
    const targetNode = nodes.find((node) => node.id === connection.target);
    const connectionToAnotherNode = edges.find(edge => edge.source == connection.source)
    if(sourceNode?.type === 'chapter' && targetNode?.type === 'chapter' && !connectionToAnotherNode){
        return true;
    }
    if (sourceNode?.type === 'action' && targetNode?.type === "character"){
        return true;
    }
    if (sourceNode?.type == "character" && targetNode?.type == 'action'){
        return true;
    }
    return false
}


export {
    connectionHasCycle,
    isValidEdge
}
