import { Separator } from "@/components/ui/separator"
import NewNodeCreator from './NewNodeCreator';
import NodesDuplicator from './NodesDuplicator';
import CanvasList from "./CanvasList";

const NodesList = () => {
    return (
        <div className="grid grid-cols-2">
            <div>
                <NewNodeCreator />
                <Separator />
                <NodesDuplicator />
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <CanvasList />
                </div>
            </div>
        </div>

    );
};

export default NodesList;
