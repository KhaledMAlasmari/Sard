import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LightningBoltIcon } from "@radix-ui/react-icons"

import tutorial from '@/utils/tutorial_info';
import { Button } from './ui/button';
interface TutorialProps {
    // Define your component props here
}

const Tutorial: React.FC<TutorialProps> = () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [selectedTip, setSelectedTip] = React.useState<{ image: string; title: string; description: string; }>(tutorial.tabs[0]);
    const [open, setOpen] = React.useState(localStorage.getItem('readTutorial') ? false : true);
    React.useEffect(() => {
        if (open) {
            const isTutorialRead = localStorage.setItem('readTutorial', 'true');
        }
    }, [open]);
    const incrementStep = () => {
        const incremented_step = currentStep + 1;
        const maxStep = tutorial.length - 1;
        const step = incremented_step > maxStep ? maxStep : incremented_step;
        setCurrentStep(step);
        setSelectedTip(tutorial.tabs[step]);
    }
    const decrementStep = () => {
        const decremented_step = currentStep - 1;
        const step = decremented_step < 0 ? 0 : decremented_step;
        setCurrentStep(step);
        setSelectedTip(tutorial.tabs[step]);

    }
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <div className='flex justify-center'>
                <DialogTrigger asChild>
                    <Button className='py-2 px-4 rounded-lg w-48 !bg-yellow-500 text-white -align-center m-4 self-center h-[40px]'>
                        <LightningBoltIcon className="h-4 w-4" /> Tutorial
                    </Button>
                </DialogTrigger>
            </div>
            <DialogContent className='text-white min-w-[650px] !bg-gray-950'>
                <DialogHeader>
                    <DialogTitle className='text-white text-center'>{selectedTip.title}</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div className='text-white'>
                    <div>
                        <img className=' w-[600px] min-h-[338px] ' src={selectedTip.image} />
                    </div>
                    <div className='m-[10px] h-24 whitespace-pre-line'>
                        {selectedTip.description}
                    </div>
                </div>
                <div className='flex justify-between'>
                    <Button className='w-32 text-center' onClick={decrementStep}>Previous tip</Button>
                    <Button className='w-32 text-center' onClick={incrementStep}>Next tip</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Tutorial;
