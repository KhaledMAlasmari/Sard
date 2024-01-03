import React, { useState, useCallback, } from 'react';
import { DragDropContext, Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '@/components/Droppable'
import useStore from '@/utils/nodeStore';
export default () => {
    const grid = 8
    // fake data generator
    const getItemStyle = (
        isDragging: boolean,
        draggableStyle: DraggingStyle | NotDraggingStyle | undefined
    ): React.CSSProperties => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: '16px 0px',
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "rgb(75 85 99)" : "rgb(31 41 55)",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const selectedCanvas = useStore(state => state.selectedCanvas)
    const getCompletedEvents = useStore(state => state.getCompletedEvents)
    const reorderNodes = useStore(state => state.reorderNodes)


    const handleDragEnd = (result: any) => {
        console.log(result)
        if (!result.destination) {
            return
        }
        const destination = result.destination.index
        const source = result.source.index
        reorderNodes(source, destination)
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <StrictModeDroppable droppableId="dropMenu">
                {(provided, snapshot) => (
                    <div
                        key="dropMenu2"
                        className='overflow-y-hidden w-full h-[48rem] overflow-clip flex flex-col items-center'
                        ref={provided.innerRef}
                    >
                        {
                            getCompletedEvents(selectedCanvas).map((item, index) => (
                                <Draggable
                                    key={index}
                                    draggableId={String(index)}
                                    index={item.index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            className='rounded-lg text-center w-96'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.event}
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    )
};
