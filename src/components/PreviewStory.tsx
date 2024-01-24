import { useStore } from '@/utils/socketStore';
import { ScrollArea } from "@/components/ui/scroll-area"
import React from 'react';
import { Progress } from "@/components/ui/progress"
import GenerateStoryButton from './GenerateStoryButton';
import DownloadButton from './DownloadButton';

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla aliquet enim tortor at auctor urna nunc. Enim ut sem viverra aliquet. Vitae aliquet nec ullamcorper sit amet risus nullam. Adipiscing tristique risus nec feugiat. Diam sollicitudin tempor id eu. Non tellus orci ac auctor augue mauris augue neque gravida. Risus ultricies tristique nulla aliquet enim tortor at auctor. Dignissim suspendisse in est ante in nibh mauris cursus mattis. Semper eget duis at tellus at urna condimentum mattis pellentesque. Aliquam faucibus purus in massa tempor nec. Viverra mauris in aliquam sem. Malesuada fames ac turpis egestas. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Et malesuada fames ac turpis egestas sed tempus urna et. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Et odio pellentesque diam volutpat commodo. Ut pharetra sit amet aliquam id diam maecenas ultricies. Erat nam at lectus urna duis convallis convallis. Pharetra diam sit amet nisl suscipit adipiscing. Augue neque gravida in fermentum et sollicitudin ac. Dignissim cras tincidunt lobortis feugiat vivamus at augue. Vel facilisis volutpat est velit egestas dui id ornare arcu. Ullamcorper sit amet risus nullam eget. Laoreet id donec ultrices tincidunt. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Ut placerat orci nulla pellentesque dignissim enim. Arcu ac tortor dignissim convallis aenean et. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Quis auctor elit sed vulputate mi sit amet mauris. Iaculis nunc sed augue lacus viverra. Enim sit amet venenatis urna cursus eget nunc scelerisque. Auctor eu augue ut lectus arcu bibendum at varius vel. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Iaculis eu non diam phasellus vestibulum lorem sed. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Donec ultrices tincidunt arcu non sodales neque sodales ut etiam. Lectus mauris ultrices eros in. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Congue quisque egestas diam in arcu cursus euismod quis. Non quam lacus suspendisse faucibus interdum posuere lorem. Vivamus at augue eget arcu dictum varius duis at consectetur. Sit amet facilisis magna etiam tempor orci. Enim sit amet venenatis urna cursus. Nec dui nunc mattis enim ut tellus elementum sagittis. Blandit libero volutpat sed cras ornare arcu dui. Etiam sit amet nisl purus in mollis nunc sed. Arcu cursus vitae congue mauris rhoncus aenean vel elit. Sagittis orci a scelerisque purus. Non arcu risus quis varius quam quisque id diam. Elementum eu facilisis sed odio morbi quis commodo odio aenean. Nunc lobortis mattis aliquam faucibus purus in. Arcu bibendum at varius vel pharetra vel. Ornare arcu odio ut sem nulla pharetra diam sit amet. Lobortis mattis aliquam faucibus purus in massa tempor nec. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Enim nunc faucibus a pellentesque sit amet porttitor eget. Pretium viverra suspendisse potenti nullam ac. Cras pulvinar mattis nunc sed blandit libero. Quis lectus nulla at volutpat diam ut venenatis tellus in. Diam sit amet nisl suscipit. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Volutpat diam ut venenatis tellus in. Cursus in hac habitasse platea dictumst. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Amet nulla facilisi morbi tempus iaculis urna id volutpat. Sed odio morbi quis commodo odio. Turpis egestas sed tempus urna et pharetra. Sapien pellentesque habitant morbi tristique senectus. Urna et pharetra pharetra massa massa. Ultricies leo integer malesuada nunc vel risus commodo viverra. Augue neque gravida in fermentum et sollicitudin. Ut faucibus pulvinar elementum integer enim neque. Ut tortor pretium viverra suspendisse potenti nullam. Enim facilisis gravida neque convallis a cras semper auctor. Ac turpis egestas maecenas pharetra. Adipiscing enim eu turpis egestas. Suspendisse sed nisi lacus sed viverra tellus in. Quis imperdiet massa tincidunt nunc pulvinar. Posuere sollicitudin aliquam ultrices sagittis orci a. Nunc mi ipsum faucibus vitae aliquet nec. Nibh sed pulvinar proin gravida hendrerit lectus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Felis donec et odio pellentesque diam volutpat. Sagittis aliquam malesuada bibendum arcu. Cursus euismod quis viverra nibh cras. Nisl pretium fusce id velit ut. Non tellus orci ac auctor augue mauris augue neque. Aliquet bibendum enim facilisis gravida neque convallis a. Non tellus orci ac auctor. Odio facilisis mauris sit amet massa vitae tortor. Dapibus ultrices in iaculis nunc sed augue lacus viverra. Accumsan lacus vel facilisis volutpat est velit. Fringilla est ullamcorper eget nulla facilisi etiam. Nec sagittis aliquam malesuada bibendum arcu. Lectus sit amet est placerat in egestas erat imperdiet sed. Urna duis convallis convallis tellus id."
interface PreviewStoryProps {
    // Define your component props here
}

const PreviewStory: React.FC<PreviewStoryProps> = () => {
    const story = useStore((state) => state.generated_story);
    const generation_progress = useStore((state) => state.generation_progress);
    const stream_output = useStore((state) => state.stream_output);
    const full_story = story?.story?.map(chapter => chapter.chapter_story).join('\n')
    const waitingForStory = useStore((state) => state.waitingForOutput);
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
    if ((!waitingForStory && story) || story) {
        return (
            <div className='h-screen'>
                <ScrollArea className='flex flex-row flex-wrap h-full'>
                    {story.story?.map((chapter) => {
                        return (
                            <div key={chapter.chapter_id}>
                                <h1 className='text-center m-4 font-bold'>Chapter {chapter.chapter_id}</h1>
                                <div className="mt-6 mr-2 border-l-2 pl-6 italic">
                                    <blockquote className='whitespace-pre-line'>
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
