import create from "zustand";
import { combine } from "zustand/middleware";

import ioClient from "socket.io-client";
import { GeneratedStory, Story } from "./types/storyTypes";
import { get } from "http";

interface IStoryState {
    generated_story: GeneratedStory | null
    stream_output: string
    socketIsOpen: boolean;
    waitingForOutput: boolean
    generation_progress: number
    full_story: string|null
}

/*
 The initial state shapes what values we can have in our store.
 We can order them as we like or use multiple stores.
 For our game, I'll use only one store.

 Our server only sends the game state updates so that's almost all we need.
 We use the 'ready' state to know if we are connected to the server or not.
*/

const initialState: IStoryState = {
    generated_story: {
        story:
            [{
                chapter_id: 1,
                chapter_prompt: "wow",
                chapter_story: "long tdasssssssssssssssssssssssssssssssssssssskdmslmkadsldmskldsmkldsmkldsmkladsmkladsmkadsmklmadskmkdslmadkslmladskmkadslmkdslmdksmlksmdsklext1"
            },]
    },
    stream_output: '',
    socketIsOpen: true,
    waitingForOutput: false,
    generation_progress: 0,
    full_story: "long text 1"
};
/*
const initialState: IStoryState = {
    generated_story: null,
    stream_output: '',
    socketIsOpen: false,
    waitingForOutput: false,
    generation_progress: 0,
    full_story: null
};
*/
/*
 Here we have access to two functions that
 let us mutate or get data from our state.

 This is where the magic happens, we can fully hide
 the WebSocket implementation here and then use our store anywhere in our app!
 */

 const get_full_story = () => {
    
 }
 
const mutations = (setState: (state: Partial<IStoryState>) => void, getState: () => IStoryState) => {
    const socket = ioClient(import.meta.env.VITE_WS_BACKEND_URL);
    // this is enough to connect all our server events
    // to our state managment system!
    socket
        .on("connect", () => {
            setState({socketIsOpen: true });
        })
        .on("disconnect", () => {
            setState({ socketIsOpen: false });
        })
        .on("generated_story", (data: GeneratedStory) => {
            console.log({data})
            const story = data?.story?.map(chapter => chapter.chapter_story).join('\n')
            setState({ generated_story: data, waitingForOutput: false, full_story: story});
        })
        .on("stream_output", (data: {output: string}) => {
            setState({ stream_output: data.output });
        })
        .on("progress", (data: {progress: number}) => {
            console.log({data})
            setState({generation_progress: data.progress})
        })


    return {
        actions: {
            generateStory(storyData: Story) {
                socket.emit("generate_story", storyData);
                setState({ waitingForOutput: true });
            }
        },
        resetStory() {
            setState({ generated_story: null, generation_progress: 0});
        },
        changeChapterStory(chapterId: number, story: string) {
            // change one chapter only, the one with the id
            const newStory = getState().generated_story?.story?.map(chapter => {
                if (chapter.chapter_id === chapterId) {
                    return {...chapter, chapter_story: story}
                }
                return chapter
            })  || []
            const newStoryData = {story: newStory}
            setState({ generated_story: newStoryData});
        }
    };
};

//We created our first store!
export const useStore = create(combine(initialState, mutations));
