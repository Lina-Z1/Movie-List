import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { fetchTopRated, fetchByGenre } from '../services/api';

const CATEGORY_MAP = {
    top_rated: { label: 'Top Rated' },
    comedy: { label: 'Comedy' },
    horror: { label: 'Horror' },
    romance: { label: 'Romance' },
    scifi: { label: 'Sci-Fi' },
    adventure: { label: 'Adventure' },
};

const MoviesPage = () => {
    const { category } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadMovies();
    }, [category]);

    const loadMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = category === 'top_rated'
                ? await fetchTopRated()
                : await fetchByGenre(category);
            setMovies(result);
        } catch {
            setError('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h2 className='mt-3'>{CATEGORY_MAP[category]?.label || 'Movies'}</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && <MovieList movies={movies} />}
        </main>
    );
};

export default MoviesPage;