import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import TVShowList from '../components/TVShowList';
import { fetchTopRated, searchMovies, searchShows } from '../services/api';

const Home = ({ searchQuery }) => {
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadData();
    }, [searchQuery]);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            if (searchQuery) {
                const [movieResults, showResults] = await Promise.all([
                    searchMovies(searchQuery),
                    searchShows(searchQuery),
                ]);
                setMovies(movieResults);
                setShows(showResults);
            } else {
                const result = await fetchTopRated();
                setMovies(result);
                setShows([]);
            }
        } catch {
            setError('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className=" text-white" style={{ minHeight: '100vh' }}>
            <div className="container-fluid px-3 px-md-4 py-4">

                {loading && (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
                        <div className="spinner-border text-light opacity-50" />
                    </div>
                )}

                {error && <p className="text-center text-danger">{error}</p>}

                {!loading && !error && (
                    <>
                        {searchQuery ? (
                            <>
                                {movies.length > 0 && (
                                    <>
                                        <h5 className="fw-bold text-white mb-3 mt-2">
                                            Movies for <span className="text-Light">"{searchQuery}"</span>
                                        </h5>
                                        <MovieList movies={movies} />
                                    </>
                                )}
                                {shows.length > 0 && (
                                    <>
                                        <h5 className="fw-bold text-white mb-3 mt-4">
                                            TV Shows for <span className="text-Light">"{searchQuery}"</span>
                                        </h5>
                                        <TVShowList shows={shows} />
                                    </>
                                )}
                                {movies.length === 0 && shows.length === 0 && (
                                    <p className="text-center text-white-50 mt-5">
                                        No results found for "{searchQuery}"
                                    </p>
                                )}
                            </>
                        ) : (
                            <>
                                <h5 className="fw-bold text-white mb-3 mt-2">Top Rated</h5>
                                <MovieList movies={movies} />
                            </>
                        )}
                    </>
                )}

            </div>
        </main>
    );
};

export default Home;