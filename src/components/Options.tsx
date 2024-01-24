import React from 'react';
import GenreSelector from './GenreSelector';
import GenerateStoryButton from './GenerateStoryButton';
import ClearStateButton from './ClearStateButton';
import StoryTypeSelector from './StoryTypeSelector';
import Tutorial from './Tutorial';

interface OptionsProps {
    // Define your component props here
}

const Options: React.FC<OptionsProps> = () => {
    // Implement your component logic here

    return (
        // JSX code for your component's UI
        <div>

            <div className='grid grid-cols-2'>
                <GenreSelector />
                <StoryTypeSelector />
            </div>
            <div className='grid grid-cols-1 mt-8'>
                <ClearStateButton />
                <Tutorial />
            </div>

        </div>
    );
};

export default Options;
