import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Buffer } from 'buffer';

type ImageViewerProps = {
    image: string | undefined;
    title: string
}

const ImageViewer: React.FC<ImageViewerProps> = ({ image, title }) => {
    return (
        <Dialog>
            <DialogTrigger className={`absolute top-2 right-8 p-1 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors`} ></DialogTrigger>
            <DialogContent className='bg-gray-900 text-white'>
                <DialogHeader>
                    {title} image preview
                </DialogHeader>
                <div className='flex justify-center '>
                    {
                        image ?
                            <img draggable={false} className='max-h-96 max-w-96' src={image} />
                            :
                            null
                    }
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default ImageViewer;
