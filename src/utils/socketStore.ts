import create from "zustand";
import { combine } from "zustand/middleware";

import ioClient from "socket.io-client";
import { GeneratedStory, Story } from "./types/storyTypes";

interface IStoryState {
    generated_story: GeneratedStory | null
    stream_output: string
    socketIsOpen: boolean;
    waitingForOutput: boolean
    isTranslating: boolean
    isAudioGenerating: boolean
    generation_progress: number
    translated_story: { [chapterId: number]: string };
    audio: string
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
    isAudioGenerating: false,
    isTranslating: false,
    socketIsOpen: false,
    waitingForOutput: false,
    generation_progress: 0,
    translated_story: {},
    audio: "",
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
            setState({ socketIsOpen: true });
        })
        .on("disconnect", () => {
            setState({ socketIsOpen: false });
        })
        .on("generated_story", (data: GeneratedStory) => {
            console.log({ data })
            setState({ generated_story: data });
            setState({ waitingForOutput: false });
        })
        .on("stream_output", (data: { output: string }) => {
            setState({ stream_output: data.output });
        })
        .on("progress", (data: { progress: number }) => {
            console.log({ data })
            setState({ generation_progress: data.progress })
        }).on("translatred_story", (data: { chapterId: number, translatedText: string }) => {
            const currentTranslations = { ...getState().translated_story };

            currentTranslations[data.chapterId] = data.translatedText;
            setState({ translated_story: currentTranslations, isTranslating: false });


        }).on("audio_story", (data: { audio: any }) => {
            setState({ audio: data.audio, isAudioGenerating: false });
  

        })
        ;


    return {
        setTranslating: (isTranslating: boolean) => {
            setState({ isTranslating });
        },
        setAudioGenerating: (isAudioGenerating: boolean) => {
            setState({ isAudioGenerating });
        },
        actions: {
            generateStory(storyData: Story) {
                socket.emit("generate_story", storyData);
                setState({ waitingForOutput: true });
            }
        },
        translateStory(chapterId: number, text: any) {
            socket.emit("translate_chapter", { chapterId, text });
        },
        generateAudio(text: string) {
            console.log(text)
            socket.emit("text_to_audio", text);
        },
        resetStory() {
            setState({ generated_story: null, generation_progress: 0, translated_story: {} });
        }
    };
};

//We created our first store!
export const useStore = create(combine(initialState, mutations));
