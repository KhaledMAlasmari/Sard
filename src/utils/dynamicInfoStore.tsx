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
    genre: string;
    availableGenres: string[]
    //isValidStory: boolean;
    updateGenre: (genre: string) => void
    updateAvaliableGenres: (genres: string[]) => void
  };
  
  const initialState = {
    genre: "",
    availableGenres: [] as string[],
  }
  
  // this is our useStore hook that we can use in our components to get parts of the store and call actions
  const dynamicInfoStore = createWithEqualityFn<RFState>()(
      (set, get) => ({
        ...initialState,
        reset: () => {
          set(initialState)
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
      })
    );
  
  export default dynamicInfoStore;
  