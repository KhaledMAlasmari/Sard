
import React from "react";
import { DragDropContext, Draggable, Droppable, OnDragEndResponder, DraggableProvided, DroppableProvided, Direction } from "react-beautiful-dnd";

interface AppDraggableListProps<T> {
    droppableId: string;
    data: T[];
    onDragEnd: OnDragEndResponder;
    renderItem: (item: T, provided: DraggableProvided) => JSX.Element;
    renderWrapper: (
        children: JSX.Element,
        providedMain: DroppableProvided,
    ) => JSX.Element;
    direction?: Direction;
}

export const AppDraggableList = <T extends { id: number }>({
    droppableId,
    data,
    onDragEnd,
    renderItem,
    renderWrapper,
    direction,
}: AppDraggableListProps<T>) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId} direction={direction}>
            {(providedMain) =>
                renderWrapper(
                    <>
                        {data.map((item, index) => (
                            <Draggable
                                key={item.id}
                                index={index}
                                draggableId={String(item.id)}
                            >
                                {(provided) => renderItem(item, provided)}
                            </Draggable>
                        ))}

                        {providedMain.placeholder}
                    </>,
                    providedMain
                )
            }
        </Droppable>
    </DragDropContext>
);
