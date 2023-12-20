import React, { useState } from 'react';
import { get_story_data } from '@/utils/story_data_formatter'
import useStore from '@/utils/nodeStore';
import {
    useStore as useSocketsStore
} from '@/utils/socketStore';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { isValidStory } from '@/utils/story_data_validator';

interface GenerateStoryButtonProps {
    // Add any props you need here
}

const GenerateStoryButton: React.FC<GenerateStoryButtonProps> = () => {
    const nodes = useStore((state) => state.nodes)
    const edges = useStore((state) => state.edges)
    const genre = useStore((state) => state.genre)
    const sendStoryToBackend = useSocketsStore((state) => state.actions.generateStory)
    const resetStory = useSocketsStore((state) => state.resetStory)
    const [validStory, setValidStory] = useState(false)
    const generateStory = (event: { preventDefault: () => void; }) => {
        const storyData = get_story_data(nodes, edges, genre || "")
        const storyValidationResult = isValidStory(storyData)
        console.log(storyValidationResult)
        if (storyValidationResult !== true) {
            setValidStory(false)
            console.log("invalid story")
        }
        else {
            setValidStory(true)
            resetStory()
            sendStoryToBackend(storyData)
            console.log("valid story")
        }
    }

    return (
        // Add your JSX code here
        <Dialog>
            <DialogTrigger asChild>
                <div className='flex justify-center items-center w-full'>
                    <button onClick={generateStory} className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full ">Generate story</button>
                </div>
            </DialogTrigger>
            {
                validStory ?
                    <DialogContent className="sm:max-w-[425px] text-white">
                        <DialogHeader>
                            <DialogTitle>Success</DialogTitle>
                        </DialogHeader>
                        <>
                            Your story is being generated, please navigate to the story section in the side menu. <br />
                            It may take a few minutes
                        </>
                    </DialogContent>
                    :
                    <DialogContent className="sm:max-w-[425px] text-white">
                        <DialogHeader>
                            <DialogTitle>Incomplete story</DialogTitle>
                        </DialogHeader>
                        <>
                            Please make sure you have at least one complete event in all of your chapters (with at least two characters and an action connecting them) in your story.<br />
                            Also, make sure none of your characters or actions are unnamed.
                        </>
                    </DialogContent>
            }
        </Dialog>
    );
};

export default GenerateStoryButton;
