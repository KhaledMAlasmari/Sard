import useStore from "@/utils/nodeStore";
import { Panel, useViewport } from "reactflow";
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
    };
    function addChapter(): void {
        addNode({x: (0 + Math.random() * 100), y: (0 + Math.random() * 100)}, 'chapter')
    }

    return (
        <Panel position="top-left" style={{ margin: '0px' }} className="flex flex-col bg-gray-900 text-white h-screen w-64">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Story Genre</h1>
                <select defaultValue={"Disabled"} disabled={true} className="bg-gray-800 mt-2 p-2 rounded-lg w-full">
                    <option>Disabled</option>
                    <option>Fantasy</option>
                    <option>Sci-Fi</option>
                    <option>Mystery</option>
                    <option>Thriller</option>
                </select>
            </div>
            <div className="p-4">
                <button onClick={addChapter} className="bg-purple-600 text-white py-2 px-4 rounded-lg w-full">Add Chapter</button>
            </div>
            <div onClick={toggleMode} className="p-4">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full">Switch theme</button>
            </div>
            <div className="p-4">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full">Generate</button>
            </div>
        </Panel>
    );
};

export default Sidebar;
