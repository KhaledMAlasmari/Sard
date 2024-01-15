import create from "zustand";
import { combine } from "zustand/middleware";

import ioClient from "socket.io-client";
import { GeneratedStory, Story } from "./types/storyTypes";

interface IStoryState {
    generated_story: GeneratedStory | null
    stream_output: string
    socketIsOpen: boolean;
    waitingForOutput: boolean
}

/*
 The initial state shapes what values we can have in our store.
 We can order them as we like or use multiple stores.
 For our game, I'll use only one store.

 Our server only sends the game state updates so that's almost all we need.
 We use the 'ready' state to know if we are connected to the server or not.
*/
const initialState: IStoryState = {
    generated_story: null,
    stream_output: '',
    socketIsOpen: false,
    waitingForOutput: false,
};

/*
 Here we have access to two functions that
 let us mutate or get data from our state.

 This is where the magic happens, we can fully hide
 the WebSocket implementation here and then use our store anywhere in our app!
 */
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
            setState({ generated_story: data });
            setState({ waitingForOutput: false });
        })
        .on("stream_output", (data: {output: string}) => {
            setState({ stream_output: data.output });
        })


    return {
        actions: {
            generateStory(storyData: Story) {
                socket.emit("generate_story", storyData);
                setState({ waitingForOutput: true });
            }
        },
        resetStory() {
            setState({ generated_story: null });
        }
    };
};

//We created our first store!
export const useStore = create(combine(initialState, mutations));
