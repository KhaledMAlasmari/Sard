import React, { useState } from 'react';
import { get_story_data } from '@/utils/story_data_formatter'
import useStore from '@/utils/nodeStore';
import dynamicInfoStore from '@/utils/dynamicInfoStore';
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
    const genre = dynamicInfoStore((state) => state.genre)
    const storyType = useStore((state) => state.storyType)
    const sendStoryToBackend = useSocketsStore((state) => state.actions.generateStory)
    const resetStory = useSocketsStore((state) => state.resetStory)
    const [validStory, setValidStory] = useState(false)
    const generateStory = (event: { preventDefault: () => void; }) => {
        const storyData = get_story_data(nodes, edges, genre || "", storyType)
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

    const invalidStoryReasons = {
        "Free": "Please make sure you have at least one complete event in all of your boards \n(with at least two characters and an action/relationship connecting them) in your story.\nAlso, make sure none of your characters or actions/relationships are unnamed.",
        "Three": "Please make sure you have at least three boards to fit your selected story structure, one complete event in all of your boards (with at least two characters and an action/relationship connecting them) in your story.\nAlso, make sure none of your characters or actions/relationships are unnamed.",
        "Five": "Please make sure you have at least five boards to fit your selected story structure, one complete event in all of your boards (with at least two characters and an action/relationship connecting them) in your story.\nAlso, make sure none of your characters or actions/relationships are unnamed.",
    }
    return (
        // Add your JSX code here
        <Dialog>
            <div className='flex justify-center items-center'>
                <DialogTrigger asChild>
                    <button onClick={generateStory} className="bg-blue-500 text-black py-2 px-4 rounded-lg  w-48 m-4">Generate story</button>
                </DialogTrigger>
            </div>

            {
                validStory ?
                    <DialogContent className="sm:max-w-[425px] text-black">
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
                            <p>
                                {
                                    // @ts-ignore
                                    invalidStoryReasons[storyType]
                                }
                            </p>
                        </>
                    </DialogContent>
            }
        </Dialog>
    );
};

export default GenerateStoryButton;
