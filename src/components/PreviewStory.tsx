import { useStore } from '@/utils/socketStore';
import { ScrollArea } from "@/components/ui/scroll-area"
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"

interface PreviewStoryProps {
    // Define your component props here
}

const PreviewStory: React.FC<PreviewStoryProps> = () => {
    const story = useStore((state) => state.generated_story);
    const stream_output = useStore((state) => state.stream_output);
    
    /* const story = {
        story: [{
            chapter_id: 1,
            chapter_prompt: "wow",
            chapter_story: "long text",
        },
        {
            chapter_id: 2,
            chapter_prompt: "wow",
            chapter_story: "long text2",
        }]
    } */
    const waitingForStory = useStore((state) => state.waitingForOutput);
    if(stream_output != ''){
        return (
            <ScrollArea className='flex flex-row flex-wrap h-[40rem]'>
                <div className="mt-6 mr-2 border-l-2 pl-6 italic">
                    <blockquote className='whitespace-pre-line'>
                        {stream_output.trimEnd().trimStart()}
                    </blockquote>
                </div>
            </ScrollArea>
        )
    }
    if ((!waitingForStory && story) || story) {
        return (
            <ScrollArea className='flex flex-row flex-wrap h-[40rem]'>
                {story.story?.map((chapter) => {
                    return (
                        <div key={chapter.chapter_id}>
                            <h1 className='text-center m-4 font-bold'>Chapter {chapter.chapter_id + 1}</h1>
                            <div className="mt-6 mr-2 border-l-2 pl-6 italic">
                                <blockquote className='whitespace-pre-line'>
                                    {chapter.chapter_story.trimEnd().trimStart()}
                                </blockquote>
                            </div>
                        </div>
                    )
                })}
            </ScrollArea>
        )
    }
    else if (waitingForStory && !story) {
        return (
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="h-4 w-[290px]" />
                    <Skeleton className="h-4 w-[280px]" />
                    <Skeleton className="h-4 w-[270px]" />
                    <Skeleton className="h-4 w-[260px]" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[240px]" />
                </div>
            </div>
        )
    }
    else {
        return <div>
            <h1 className="text-center">Please generate a story</h1>
        </div>
    }
};

export default PreviewStory;
