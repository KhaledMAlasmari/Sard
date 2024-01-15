import onDragStart from '@/utils/dragDataTransfer';
import React from 'react';

interface NewNodeCreatorProps {
}

const NewNodeCreator: React.FC<NewNodeCreatorProps> = () => {

    return (
        <div>
            <h1 className="text-2xl font-bold text-center">New elements</h1>
            <div className='flex justify-around p-3'>
                <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer"
                    draggable
                    onDragStart={(event) => onDragStart(event, JSON.stringify({ type: "new", node_info: { type: "character", data: { name: null, image: null } } }))}
                >
                    <img src="icons/character.png" />
                </div>
                {
                    // chapter icon
                    /*
                                            
            <div
                className="flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer"
                draggable
                onDragStart={(event) => onDragStart(event, JSON.stringify({ type: "new", node_info: { type: "chapter", data: { name: null, image: null } } }))}
            >
                <img src="icons/chapter.png" />
            </div>
                    
                    */
                }
                <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer"
                    draggable
                    onDragStart={(event) => onDragStart(event, JSON.stringify({ type: "new", node_info: { type: "action", data: { name: null, image: null } } }))}
                >
                    <img src="icons/action.png" />
                </div>
                <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer"
                    draggable
                    onDragStart={(event) => onDragStart(event, JSON.stringify({ type: "new", node_info: { type: "relationship", data: { name: null, image: null } } }))}
                >
                    <img src="icons/relationship.png" />
                </div>
            </div>
        </div>
    );
};

export default NewNodeCreator;
