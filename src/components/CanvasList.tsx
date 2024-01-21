import { ScrollArea } from '@radix-ui/react-scroll-area';
import React from 'react';
import { Button } from './ui/button';
import useStore from '@/utils/nodeStore';
import { FileUploader } from './FileUploader';
import ImageViewer from './ImageViewer';
import acceptedFormats from '@/utils/acceptedFormats';
import { useReactFlow } from 'reactflow';

interface CanvasListProps {
    // Define your component props here
}

const CanvasList: React.FC<CanvasListProps> = () => {
    // Implement your component logic here
    const canvases = useStore((state) => state.canvases);
    const selectedCanvas = useStore((state) => state.selectedCanvas);
    const updateSelectedCanvas = useStore((state) => state.updateSelectedCanvas);
    const deleteCanvas = useStore((state) => state.deleteCanvas);
    const changeNodeData = useStore(state => state.changeNodeData)
    const instance = useReactFlow();
    const getNode = useStore(state => state.getNode)
    const handleImageUpload = (file: File) => {
        if (acceptedFormats.includes(file.type)) {
            const reader = new FileReader()

            reader.readAsDataURL(file)

            reader.onload = () => {
                console.log('called: ', reader)
                changeNodeData(selectedCanvas!, { image: reader.result?.toString() })
            }
        }
    }
    const createNewCanvas = useStore((state) => state.createNewCanvas);
    const getCanvasBackground = (canvas: string): string | undefined => {
        return getNode(canvas)?.data.image || ''

    }
    function addNewBoard(): void {
        createNewCanvas();
    }

    const deleteCurrentCanvas = (canvasId: string) => {
        if (canvases.length > 1) {
            deleteCanvas(canvasId)
            if(selectedCanvas == canvasId){
                updateSelectedCanvas(canvases[canvases.findIndex((e) => e == canvasId) - 1] || canvases[canvases.length - 1])
            }
        }
    }
    return (
        <div className='h-full'>
            <h1 className="text-2xl font-bold text-center p-1">Storyboards</h1>
            <ScrollArea className='flex flex-col flex-wrap h-[32rem]'>
                <div className='flex flex-col items-center justify-center'>
                    {
                        canvases.map((canvas, index) => {
                            return (
                                <div key={canvas} className='flex m-1 items-center'>
                                    <Button onClick={() => { updateSelectedCanvas(canvas) }} variant={selectedCanvas == canvas ? 'default' : 'secondary'}>{`Board ${index + 1}`}</Button>
                                    <div className='flex'>
                                        <img style={{cursor: 'pointer'}} width='28' className='m-1' onClick={() => deleteCurrentCanvas(canvas)} src='./icons/trash.svg' />
                                        <FileUploader isGreenIcon={false} handleFile={handleImageUpload} />
                                        <ImageViewer isBlueIcon={false} title='Background' image={getCanvasBackground(canvas)} />
                                    </div>
                                </div>
                            )
                        })
                    }
                    <Button onClick={addNewBoard} variant="outline">New board</Button>
                </div>
            </ScrollArea>
        </div>
    );
};

export default CanvasList;
