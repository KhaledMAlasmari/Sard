const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeProps: any) => {
    event.dataTransfer.setData('application/reactflow', nodeProps);
    event.dataTransfer.effectAllowed = 'move';
};

export default onDragStart
