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
        <div className="grid grid-rows-2">
            <h1 className="text-2xl font-bold text-center self-start mt-2">Genre</h1>
            {
                genres ?
                    <select onChange={updateGenre} className="bg-gray-800 mt-2 p-2 rounded-lg w-[14rem] h-12 justify-self-center	">
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
                    <select defaultValue={"Disabled"} disabled={true} className="bg-gray-800 m-2 p-2 rounded-lg w-32 h-8">
                    </select>
            }
        </div>
    );
};

export default GenreSelector;
