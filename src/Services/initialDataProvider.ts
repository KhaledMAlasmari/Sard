import axios from 'axios';

const get_genres = async () => {
    const genres = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/genres`)
    return genres
}
const get_authors = async () => {
    const authors = await axios.get(`${import.meta.env.BACKEND_URL}/authors`)
    return authors
}


export {
    get_genres,
    get_authors
}
