import React from 'react';
import { Icons } from './ui/Icons';

interface SpinnerProps {
}

const Spinner: React.FC<SpinnerProps> = () => {
    return (
        // Add your spinner JSX here
        <Icons.spinner className="h-4 w-4 animate-spin" />
    );
};

export default Spinner;
