import React from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import useStore from '@/utils/nodeStore';

interface StoryTypeSelectorProps {
    // Define your component props here
}

const StoryTypeSelector: React.FC<StoryTypeSelectorProps> = (props) => {
    // Implement your component logic here
    const currentStoryType = useStore((state) => state.storyType);
    const setStoryType = useStore((state) => state.setStoryType);
    const handleValueChange = (value: string) => {
        setStoryType(value)
    }
    return (
        <div>
            <h1 className="text-2xl font-bold m-2">Story structure</h1>
            <RadioGroup  onValueChange={handleValueChange} defaultValue={currentStoryType}>
                <div className="flex items-center space-x-2 m-2">
                    <RadioGroupItem  value="Free" id="Free" />
                    <Label htmlFor="Free">Free mode (Recommended for beginners)</Label>
                </div>
                <div className="flex items-center space-x-2 m-2">
                    <RadioGroupItem value="Three" id="Three" />
                    <Label htmlFor="Three">Three act (Advanced)</Label>
                </div>
                <div className="flex items-center space-x-2 m-2">
                    <RadioGroupItem value="Five" id="Five" />
                    <Label htmlFor="Five">Five act (Advanced)</Label>
                </div>
            </RadioGroup>
        </div>
    );
};

export default StoryTypeSelector;
