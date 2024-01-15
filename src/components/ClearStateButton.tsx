import useStore from '@/utils/nodeStore';
import React from 'react';
import { Button } from './ui/button';

interface ClearStateButtonProps {
}

const ClearStateButton: React.FC<ClearStateButtonProps> = () => {
    const resetState = () => {
        useStore.getState().reset();
        useStore.persist.clearStorage()
    }
    return (
        <div className='flex justify-center items-center w-full'>
            <button onClick={resetState} className="m-4 bg-red-600 text-white py-2 px-4 rounded-lg  w-[14rem]">Reset</button>
        </div>

    );
};

export default ClearStateButton;
