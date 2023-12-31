import useStore from '@/utils/nodeStore';
import React, { ChangeEvent } from 'react';

interface GenreSelectorProps {
    // Add any props you need for your component here
}

const GenreSelector: React.FC<GenreSelectorProps> = () => {
    const genres = useStore((state) => state.availableGenres)
    const updateGenreState = useStore((state) => state.updateGenre)
    const updateGenre = (event: ChangeEvent<HTMLSelectElement>) => {
        updateGenreState(event.target.value)
        
    }
    return (
        <div className="m-8 flex flex-col justify-center">
            <h1 className="text-2xl font-bold">Genre</h1>
            {
                genres ?
                    <select onChange={updateGenre} className="bg-gray-800 mt-2 p-2 rounded-lg w-full">
                        {
                            genres.map((genre) => {
                                return (
                                    <option key={genre}>
                                        {genre}
                                    </option>
                                )
                            })
                        }
                    </select>
                    :
                    <select defaultValue={"Disabled"} disabled={true} className="bg-gray-800 mt-2 p-2 rounded-lg w-full">
                    </select>
            }
        </div>
    );
};

export default GenreSelector;
