import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  XYPosition,
} from 'reactflow';

import initialNodes from './nodes';
import initialEdges from './edges';
import { createWithEqualityFn } from 'zustand/traditional';
import { nanoid } from 'nanoid';
import { get_story_data } from './story_data_formatter';
import { isValidStory } from './story_data_validator';
type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addChildNode: (parentNodeId: any, position: XYPosition, type: string, data: any) => void
  addNode: (position: XYPosition, type: string, data: any) => void
  changeNodeData: (nodeId: string, data: any) => void
  changeNodePosition: (nodeId: string, poistion: XYPosition) => void
  changeNodeWidthHeight: (nodeId: string, width: number, height: number) => void
  genre: string | null;
  availableGenres: string[] | null
  //isValidStory: boolean;
  updateGenre: (genre: string) => void
  updateAvaliableGenres: (genres: string[]) => void
};
// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = createWithEqualityFn<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  genre: null,
  availableGenres: null,
  //isValidStory: false,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
    
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  addChildNode: (parentNodeId: any, position: XYPosition, type: string, data: any) => {
    const newNode: Node = {
      id: nanoid(),
      type: type,
      data: data,
      height: 50,
      width: 50,
      extent: 'parent',
      position,
      parentNode: parentNodeId,
    };

    console.log(newNode)
    set({
      nodes: [...get().nodes, newNode],
    });
  },
  addNode: (position: XYPosition, type: string, data: any) => {
    const newNode: Node = {
      id: nanoid(),
      type: type,
      data: data,
      height: 50,
      width: 50,
      position,
    };

    console.log(newNode)
    set({
      nodes: [...get().nodes, newNode],
    });
  },
  changeNodeData: (nodeId: string, data: any) => {
    set({
      nodes: [...get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...data,
            },
          };
        }
        return node;
      })],
    });
  },
  changeNodePosition: (nodeId: string, poistion: XYPosition) => {
    set({
      nodes: [...get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            position: poistion,
          };
        }
        return node;
      })],
    });
  },
  changeNodeWidthHeight: (nodeId: string, width: number, height: number) => {
    set({
      nodes: [...get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            width: width,
            height: height,
          };
        }
        return node;
      })],
    });
  },
  updateGenre: (genre: string) => {
    set({
      genre: genre,
    });
  },
  updateAvaliableGenres: (genres: string[]) => {
    set({
      availableGenres: genres,
    });
  },
}));

export default useStore;
