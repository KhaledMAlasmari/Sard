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

import { initialCanvases, initialEdges, initialNodes } from './initialValues';
import { createWithEqualityFn } from 'zustand/traditional';
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid';
import { get_story_data, get_objects, get_subjects } from './story_data_formatter';
import { isValidStory } from './story_data_validator';
type RFState = {
  nodes: Node[];
  edges: Edge[];
  canvases: string[];
  selectedCanvas: string
  storyType: string;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addChildNode: (parentNodeId: any, position: XYPosition, type: string, data: any) => void
  addNode: (position: XYPosition, type: string, data: any) => void
  changeNodeData: (nodeId: string, data: any) => void
  changeNodePosition: (nodeId: string, poistion: XYPosition) => void
  changeNodeWidthHeight: (nodeId: string, width: number, height: number) => void
  genre: string;
  availableGenres: string[]
  //isValidStory: boolean;
  updateGenre: (genre: string) => void
  updateAvaliableGenres: (genres: string[]) => void
  updateSelectedCanvas: (canvasId: string) => void
  createNewCanvas: () => void
  getChapters: () => Node[]
  getChaptersNodes: (chapterId: string) => Node[]
  reorderNodes(startIndex: number, endIndex: number): void
  getCompletedEvents: (chapterId: string) => { index: number; event: string; }[]
  reset: () => void
  getNode: (nodeId: string) => Node | undefined
  setStoryType: (storyType: string) => void
  deleteCanvas: (canvasId: string) => void
};

const hideNodes = (nodes: Node[], canvasId: string) => {
  return nodes.map((node) => {
    if (node.data.canvas == canvasId && node.type != 'chapter') {
      return {
        ...node,
        hidden: false,
      };
    }
    return {
      ...node,
      hidden: true,
    };
  })
}

const hideEdges = (edges: Edge[], nodes: Node[]) => {
  const hiddenNodes = nodes.filter((node) => node.hidden == true).map((node) => node.id)
  return edges.map((edge) => {
    if (hiddenNodes.includes(edge.source) || hiddenNodes.includes(edge.target)) {
      return {
        ...edge,
        hidden: true,
      };
    }
    return {
      ...edge,
      hidden: false,
    };
  })
}

const initialState = {
  nodes: initialNodes,
  edges: initialEdges,
  canvases: initialCanvases,
  selectedCanvas: initialCanvases[0],
  genre: "",
  availableGenres: [] as string[],
  storyType: "Free",
  //isValidStory: false,
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = createWithEqualityFn<RFState>()(
  persist(
    (set, get) => ({
      ...initialState,
      reset: () => {
        set(initialState)
      },
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
          data: { ...data, canvas: get().selectedCanvas },
          height: 50,
          width: 50,
          position,
          parentNode: get().selectedCanvas,
        };
        console.log(get().nodes)
        console.log(newNode)
        set({
          nodes: [...get().nodes, newNode],
        });
      },
      addNode: (position: XYPosition, type: string, data: any) => {
        const newNode: Node = {
          id: nanoid(),
          type: type,
          data: { ...data, canvas: get().selectedCanvas },
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
      updateSelectedCanvas: (canvasId: string) => {
        // hide all nodes that are not part of the selected canvas
        console.log(canvasId)
        const canvases = get().canvases
        const canvasIdLeft = canvases.length == 1 ? canvases[0] : canvasId
        const hiddenNodes = hideNodes(get().nodes, canvasIdLeft)
        set({
          nodes: hideNodes(get().nodes, canvasIdLeft),
          edges: hideEdges(get().edges, hiddenNodes),
          selectedCanvas: canvasIdLeft,
        });
      },
      createNewCanvas: () => {
        const id = nanoid();
        const newNode: Node = {
          id: id,
          type: 'chapter',
          data: { name: null, image: null, title: "Chapter Title", canvas: id },
          height: 50,
          width: 50,
          position: { x: 0, y: 0 },
          hidden: true
        };
        const hiddenNodes = hideNodes([...get().nodes, newNode], id)
        set({
          canvases: [...get().canvases, id],
          selectedCanvas: id,
          nodes: hiddenNodes,
          edges: hideEdges(get().edges, hiddenNodes)
        });
        console.log(get().nodes)
      },
      getChapters: (): Node[] => {
        return get().nodes.filter((node) => node.type == 'chapter')
      },
      getChaptersNodes: (chapterId: string): Node[] => {
        return get().nodes.filter((node) => node.parentNode == chapterId && node.type == 'action')
      },
      reorderNodes: (startIndex: number, endIndex: number) => {
        const newNodes = get().nodes;
        const [removed] = newNodes.splice(startIndex, 1);
        newNodes.splice(endIndex, 0, removed);
        console.log(get().nodes)
        set({
          nodes: newNodes,
        });
      },
      getCompletedEvents: (chapterId: string) => {
        const actions = get().nodes.filter((node) => node.type == 'action' && node.parentNode == chapterId)
        const completedEvents: { index: number; event: string; }[] = []
        actions.forEach((action) => {
          const subjects = get_subjects(action, get().edges, get().nodes)
          const objects = get_objects(action, get().edges, get().nodes)
          const isSubjecstNotEmpty = subjects.every((subject) => subject.name != null && subject.name != '')
          const isObjectsNotEmpty = objects.every((object) => object.name != null && object.name != '')
          const isActionNotEmpty = action.data.name != null && action.data.name != ''
          if (isSubjecstNotEmpty && isObjectsNotEmpty && isActionNotEmpty) {
            completedEvents.push({
              index: get().nodes.indexOf(action),
              event: `${subjects.map(subject => subject.name).join(', ')} ${action.data.name} ${objects.map(object => object.name).join(', ')}`
            })
          }
        })
        return completedEvents
      },
      getNode: (nodeId: string) => {
        return get().nodes.find((node) => node.id == nodeId)
      },
      deleteCanvas: (canvasId: string) => {
        const newCanvases = get().canvases.filter((canvas) => canvas !== canvasId)
        let newSelectedCanvas = get().selectedCanvas
        if (canvasId == get().selectedCanvas) {
          newSelectedCanvas = newCanvases[newCanvases.findIndex((e) => e == canvasId) - 1 || newCanvases.length - 1]
        }
        const newNodes = get().nodes.filter((node) => (node.id !== canvasId) && (node.parentNode !== canvasId))
        const newNodesIds = newNodes.map((node) => node.id)
        const newEdges = get().edges.filter((edge) => (newNodesIds.includes(edge.source)) || (newNodesIds.includes(edge.target)))
        set({
          selectedCanvas: newSelectedCanvas,
          canvases: newCanvases,
          nodes: newNodes,
          edges: newEdges,
        })
      },
      setStoryType: (storyType: string) => {
        set({
          storyType: storyType
        })
      },
    }),
    {
      name: 'story'
    }
  ));

export default useStore;
