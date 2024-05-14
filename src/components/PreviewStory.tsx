import { useStore } from '@/utils/socketStore';
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Button } from './ui/button';
import {
    useStore as useSocketsStore
} from '@/utils/socketStore';
import { stat } from 'fs';

interface PreviewStoryProps {
    // Define your component props here
}

const PreviewStory: React.FC<PreviewStoryProps> = () => {
    const story = useStore((state) => state.generated_story);
    const generation_progress = useStore((state) => state.generation_progress);

    const stream_output = useStore((state) => state.stream_output);
    const resetStory = useSocketsStore((state) => state.resetStory)
    const generateAudio = useSocketsStore((state) => state.generateAudio)
    const translated_Story = useSocketsStore((state) => state.translated_story)
    const translateStory = useSocketsStore((state) => state.translateStory)
    const audio = useSocketsStore((state) => state.audio)

    const [showTranslation, setShowTranslation] = useState(false);
    const [translationRequested, setTranslationRequested] = useState(false);

    const handleTranslate = () => {
        if (!translationRequested) {
            useSocketsStore.setState({ isTranslating: true });
            setShowTranslation(true);
            setTranslationRequested(true);
            if (story?.story)
                story.story.forEach(chapter => {
                    translateStory(chapter.chapter_id, chapter.chapter_story);
                });
        }
    };

    const handleGenerateAudio = () => {
        if (!useSocketsStore.getState().isAudioGenerating && story && story.story) {
            generateAudio(story.story.map(chapter => chapter.chapter_story).join("\n"));
        }
    };

    const resetTranslation = () => {
        setShowTranslation(false);
        setTranslationRequested(false);
    };
    const downloadAudio = (base64Data: any) => {
        const link = document.createElement('a');
        link.href = `data:audio/mp3;base64,${base64Data}`;
        link.download = 'output.mp3';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    // const story = {
    //     story: [
    //         {
    //             chapter_id: 1,
    //             chapter_prompt: "wow",
    //             chapter_story: `Ahmad and Koi sat across from each other in a small, dimly-lit café. The smell of coffee wafted through the air, and the gentle hum of conversation created a cozy atmosphere. They had been friends for years, but lately, their relationship had grown strained. Ahmad fiddled with his mug, trying to find the right words to say.

    //         /"Koi, I need to talk to you about something,\" Ahmad said, breaking the silence.

    //         Koi looked up from her phone, her eyes meeting Ahmad's with a hint of concern. "What's up? You seem troubled."

    //         "It's just that...I feel like there's been some distance between us lately. Have I done something to upset you?" Ahmad asked hesitantly.

    //         Koi leaned back in her chair, taking a moment to think before responding. "No, Ahmad. You haven't done anything. It's just that I've been dealing with some personal stuff, and I guess I've been a bit distant. I'm sorry if it's affected our friendship."

    //         Ahmad let out a sigh of relief. "I'm glad to hear that. I was worried I had said or done something to push you away. You know you can talk to me about anything, right?"

    //         Koi smiled weakly. "I know. It's just hard for me to open up sometimes. But I appreciate your concern, and I'm lucky to have a friend like you."

    //         The conversation flowed more freely after that, with both Ahmad and Koi opening up about their lives and the struggles they were facing. As the night wore on, they laughed and shared stories, rekindling the bond they had thought was slipping away.

    //         As they stood up to leave the café, Koi turned to Ahmad and said, "Thank you for being there for me, Ahmad. It means a lot."

    //         Ahmad smiled and put his arm around Koi's shoulder. "Always, Koi. Friends stick together, no matter what."

    //         They walked out of the café and into the cool night air, their friendship stronger than ever.` ,
    //         }]
    // }
    const waitingForStory = useStore((state) => state.waitingForOutput);
    if (generation_progress > 0 && generation_progress < 100) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center space-y-2 w-full">
                    <Progress value={generation_progress} className="w-[60%] mt-4" />
                    Processing, please wait...
                </div>
            </div>
        );
    }

    else if (stream_output != '') {
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
            <div className='flex h-screen text-wrap'>
                <ScrollArea className='flex flex-row flex-wrap h-[40rem]'>
                    {story.story?.map(chapter => (
                        <div key={chapter.chapter_id}>
                            <h1 className='text-center m-4 font-bold'>Chapter {chapter.chapter_id}</h1>
                            <div className="mt-6 mr-2 border-l-2 pl-6 italic">
                                <blockquote className='whitespace-pre-line'>
                                    {showTranslation ? translated_Story[chapter.chapter_id] : chapter.chapter_story}
                                </blockquote>
                            </div>
                        </div>
                    ))}
                    <div className='mb-16 flex justify-center'>
                        <Button onClick={handleTranslate} className="bg-blue-600 text-white py-2 px-4 rounded-lg w-48 m-4">
                            Translate Story
                        </Button>

                        {showTranslation && (
                            <Button onClick={resetTranslation} className="bg-gray-600 text-white py-2 px-4 rounded-lg w-48 m-4">
                                Show Original
                            </Button>
                        )}
                        <Button
                            onClick={handleGenerateAudio}
                            disabled={!!audio || useSocketsStore.getState().isAudioGenerating}
                            className={`bg-gray-600 text-white py-2 px-4 rounded-lg w-48 m-4 ${!!audio || useSocketsStore.getState().isAudioGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Generate Audio
                        </Button>



                        {audio && <Button onClick={() => downloadAudio(audio)} className="bg-gray-600 text-white py-2 px-4 rounded-lg w-48 m-4">Download Audio</Button>}


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
            <h1 className="text-center">Please generate a story</h1>
        </div>
    }
};

export default PreviewStory;
