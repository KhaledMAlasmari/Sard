import { Separator } from "@/components/ui/separator"
import NewNodeCreator from './NewNodeCreator';
import NodesDuplicator from './NodesDuplicator';

const NodesList = () => {
    return (
        <div>
            <NewNodeCreator />
            <Separator />
            <NodesDuplicator />

        </div>
    );
};

export default NodesList;
