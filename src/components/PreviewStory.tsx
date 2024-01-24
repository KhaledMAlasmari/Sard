import { useStore } from '@/utils/socketStore';
import { ScrollArea } from "@/components/ui/scroll-area"
import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress"
import GenerateStoryButton from './GenerateStoryButton';
import DownloadButton from './DownloadButton';
import TextEditor from './TextEditor';

interface PreviewStoryProps {
    // Define your component props here
}

const PreviewStory: React.FC<PreviewStoryProps> = () => {
    const handleClick = (event: any) => {
        if (event.detail === 2) {
            console.log('double click');
            const currentNodeId = Number(event.target.id)
            const parentNodeId = Number(event.target.parentNode.id)
            const parentParentNodeId = Number(event.target.parentNode.parentNode.id)
            const chapterId = Math.max(currentNodeId, parentNodeId, parentParentNodeId)
            setEditText(chapterId)
        }
    };
    const story = useStore((state) => state.generated_story);
    const full_story = useStore((state) => state.full_story);
    const [editText, setEditText] = useState(-1);
    const generation_progress = useStore((state) => state.generation_progress);
    const stream_output = useStore((state) => state.stream_output);
    const waitingForStory = useStore((state) => state.waitingForOutput);

    if (stream_output != '') {
        return (
            <ScrollArea className='flex flex-row flex-wrap h-screen'>
                <div className="mt-6 mr-2 border-l-2 pl-6 italic">
                    <blockquote className='whitespace-pre-line'>
                        {stream_output.trimEnd().trimStart()}
                    </blockquote>
                </div>
            </ScrollArea>
        )
    }
    if (editText != -1) {
        return (
            <div className='h-screen overflow-hidden'>
                <ScrollArea className='flex flex-row flex-wrap h-full max-h-[90vh]'>
                    <TextEditor chapter_id={editText} setEditText={setEditText} />
                </ScrollArea>

            </div>
        )
    }
    else if ((!waitingForStory && story) || story) {
        return (
            <div className='flex h-screen text-wrap	'>
                <ScrollArea className='flex flex-row flex-wrap h-full'>
                    {story.story?.map((chapter) => {
                        return (
                            <div className='flex flex-col' onClick={handleClick} key={chapter.chapter_id} id={`${chapter.chapter_id}`}>
                                <h1 className='flex text-center m-4 font-bold'>Chapter {`${chapter.chapter_id}`}</h1>
                                <div className="flex mt-6 mr-2 border-l-2 pl-6 italic">
                                    <blockquote className='flex whitespace-pre-line'>
                                        {chapter.chapter_story.trimEnd().trimStart()}
                                    </blockquote>
                                </div>
                            </div>
                        )
                    })}
                    <div className='mb-16 flex justify-center'>
                        <GenerateStoryButton />
                        <DownloadButton file_name='story.txt' label='Export story' textOutput={full_story} />
                    </div>
                </ScrollArea>
            </div>
        )
    }
    else if (waitingForStory && !story) {
        return (
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center space-y-2 w-[60%]">
                    Your story is being generated. Please wait!
                    <Progress value={generation_progress} className="w-[60%] mt-4" />
                </div>
            </div>
        )
    }
    else {
        return <div>
            <GenerateStoryButton />
        </div>
    }
};

export default PreviewStory;
