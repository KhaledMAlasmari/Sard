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
                <CollapsibleTrigger style={isOpen ? {"visibility": "hidden"} : {} } asChild><Button className="rotate-90 ml-[-2rem]" variant="secondary">Menu</Button></CollapsibleTrigger>
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
                            <div className="p-4">
                                <h1 className="text-2xl font-bold">Genre</h1>
                                <select defaultValue={"Disabled"} disabled={true} className="bg-gray-800 mt-2 p-2 rounded-lg w-full">
                                    <option>Disabled</option>
                                    <option>Fantasy</option>
                                    <option>Sci-Fi</option>
                                    <option>Mystery</option>
                                    <option>Thriller</option>
                                </select>
                            </div>
                            <div onClick={toggleMode} className="p-4">
                                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full">Switch theme</button>
                            </div>
                            <div className="p-4">
                                <button disabled className="bg-blue-600 text-white py-2 px-4 rounded-lg  disabled:bg-gray-600 w-full ">Generate story</button>
                            </div>

                        </TabsContent>
                        <TabsContent className="h-full" value="story_elements"><NodesList /></TabsContent>
                        <TabsContent value="generated_story">Story so far....</TabsContent>
                    </Tabs>
                </Panel>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default Sidebar;
