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
type props = {
    themeState: {
        mode: string,
        setMode: React.Dispatch<React.SetStateAction<string>>
    }
}
const Sidebar = ({ themeState }: props) => {
    const addNode = useStore((state) => state.addNode);
    const toggleMode = () => {
        themeState.setMode((m) => (m === 'light' ? 'dark' : 'light'));
    }
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Collapsible onOpenChange={setIsOpen}
            open={isOpen}>
            <Panel position="top-left">
                <CollapsibleTrigger style={isOpen ? { "visibility": "hidden" } : {}} asChild><Button className="rotate-90 ml-[-2rem]" variant="secondary">Menu</Button></CollapsibleTrigger>
            </Panel>
            <CollapsibleContent className="animate-in slide-in-from-left" >
                <Panel position="top-left" style={{ margin: '0px' }} className="flex flex-col bg-gray-900 text-white h-screen w-80">
                    <div className="h-8">
                        <button onClick={() => setIsOpen(!isOpen)} className={`absolute top-2 right-2 p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors`} />
                    </div>

                    <Tabs defaultValue="options">
                        <TabsList className="flex flex-row content-center justify-center">
                            <TabsTrigger value="options">Options</TabsTrigger>
                            <TabsTrigger value="story_elements">Elements</TabsTrigger>
                            <TabsTrigger className='' value="generated_story">Generated Story</TabsTrigger>
                        </TabsList>
                        <TabsContent value="options">
                                <GenreSelector />
{/*                             <div onClick={toggleMode} className="m-8 flex flex-col justify-center">
                                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full">Switch theme</button>
                            </div> */}
                            
                            <div className="m-8 flex flex-row">
                                <GenerateStoryButton />
                            </div>

                        </TabsContent>
                        <TabsContent className="h-full" value="story_elements"><NodesList /></TabsContent>
                        <TabsContent value="generated_story"><PreviewStory /></TabsContent>
                    </Tabs>
                </Panel>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default Sidebar;
