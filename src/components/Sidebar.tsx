import useStore from "@/utils/nodeStore";
import { Panel } from "reactflow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NodesList from "./NodesList";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import GenerateStoryButton from "./GenerateStoryButton";
import GenreSelector from "./GenreSelector";
import PreviewStory from "./PreviewStory";
import EventsSorter from "./EventsSorter";
import ClearStateButton from "./ClearStateButton";
import StoryTypeSelector from "./StoryTypeSelector";
import Options from "./Options";
type props = {
    themeState: {
        mode: string,
        setMode: React.Dispatch<React.SetStateAction<string>>
    }
}
const Sidebar = ({ themeState }: props) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Collapsible onOpenChange={setIsOpen}
            open={isOpen}>
            <Panel position="top-left" style={{ margin: '0px', }}>
                <CollapsibleTrigger style={isOpen ? { "visibility": "hidden" } : {}} asChild><Button className="rotate-90 ml-[-1rem] mt-[1rem]" variant="secondary">Menu</Button></CollapsibleTrigger>
            </Panel>
            <CollapsibleContent className="animate-in slide-in-from-left" >
                <Panel position="top-left" style={{ margin: '0px', zIndex: '50001' }} className="flex flex-col bg-gray-900 text-white h-screen w-6/12">


                    <Tabs defaultValue="options">
                        <TabsList className="flex flex-row content-center justify-center rounded-none">
                            <div>
                                <button onClick={() => setIsOpen(!isOpen)} className={`absolute top-2 left-2 p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors`} />
                            </div>
                            <TabsTrigger value="options">Story structure</TabsTrigger>
                            <TabsTrigger value="story_elements">Elements</TabsTrigger>
                            <TabsTrigger value="events_sorter">Order events</TabsTrigger>
                            <TabsTrigger value="generated_story">My story</TabsTrigger>
                        </TabsList>
                        <TabsContent value="options">
                            <Options />
                        </TabsContent>
                        <TabsContent className="h-full" value="story_elements">
                            <NodesList />
                        </TabsContent>
                        <TabsContent value="generated_story"><PreviewStory /></TabsContent>
                        <TabsContent value="events_sorter"><EventsSorter /></TabsContent>
                    </Tabs>
                </Panel>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default Sidebar;
