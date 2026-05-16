import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/MovieDetail.css';
import {
    fetchMovieById,
    fetchMovieTrailer,
    fetchMovieCast,
    fetchRelatedMovies,
} from '../services/api';

const IMG_BASE = import.meta.env.VITE_TMDB_IMG_BASE;

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAll = async () => {
            setLoading(true);
            setError(null);
            try {
                const [movieData, trailerUrl, castData, relatedData] = await Promise.all([
                    fetchMovieById(id),
                    fetchMovieTrailer(id),
                    fetchMovieCast(id),
                    fetchRelatedMovies(id),
                ]);
                setMovie(movieData);
                setTrailer(trailerUrl);
                setCast(castData);
                setRelated(relatedData);
            } catch {
                setError('Something went wrong.');
            } finally {
                setLoading(false);
            }
        };
        loadAll();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div className="d-flex align-items-center justify-content-center bg-dark" style={{ minHeight: '60vh' }}>
            <div className="spinner-border text-light opacity-50" />
        </div>
    );
    if (error) return <div className="text-center py-5 text-danger">{error}</div>;
    if (!movie) return null;

    const languages = movie.spoken_languages?.map(l => l.english_name).join(', ');
    const genres = movie.genres?.slice(0, 3) || [];
    const heroBg = movie.backdrop_path
        ? `${IMG_BASE}${movie.backdrop_path}`
        : movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : '/movie.jpg';

    return (
        <div className="container-fluid px-2 px-md-4 py-3 py-md-4 " style={{ maxWidth: 1280, minHeight: '100vh' }}>


            <div className="hero-wrap mb-4">
                <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />
                <div className="hero-gradient" />
                <div className="hero-content">
                    <div className="mb-1">
                        {genres.map(g => (
                            <span key={g.id} className="badge-genre">{g.name}</span>
                        ))}
                    </div>
                    <h1 className="hero-title">{movie.title}</h1>
                    <p className="hero-overview">{movie.overview}</p>
                    <div className="hero-meta mb-3">
                        {movie.release_date && (
                            <span>📅 <strong>{movie.release_date.slice(0, 4)}</strong></span>
                        )}
                        {languages && (
                            <span>🌐 <strong>{languages}</strong></span>
                        )}
                        {movie.vote_average != null && (
                            <span className="rating-badge">⭐ {movie.vote_average.toFixed(1)}</span>
                        )}
                    </div>
                </div>
            </div>


            {trailer && (
                <div className="glass-panel mb-4">
                    <div className="section-heading">Trailer</div>
                    <div className="trailer-wrap">
                        <div className="ratio ratio-16x9">
                            <iframe src={trailer} title="Trailer" allowFullScreen style={{ border: 'none' }} />
                        </div>
                    </div>
                </div>
            )}


            {cast.length > 0 && (
                <div className="glass-panel mb-4">
                    <div className="section-heading">Cast</div>
                    <div className="scroll-row">
                        {cast.slice(0, 9).map(member => (
                            <Link to={`/actor/${member.id}`} key={member.id} className="cast-card">
                                <img
                                    src={member.profile_path ? `${IMG_BASE}${member.profile_path}` : '/actor.jpg'}
                                    alt={member.name}
                                />
                                <div className="cast-name">{member.name}</div>
                                <div className="cast-char">{member.character}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}


            {related.length > 0 && (
                <div className="glass-panel mb-4">
                    <div className="section-heading">You Might Like</div>
                    <div className="scroll-row">
                        {related.slice(0, 7).map(item => (
                            <Link to={`/movie/${item.id}`} key={item.id} className="movie-card">
                                <span className="movie-card-badge">Movie</span>
                                <img
                                    src={item.poster_path ? `${IMG_BASE}${item.poster_path}` : '/movie.jpg'}
                                    alt={item.title}
                                />
                                <div className="movie-card-body">
                                    <div className="movie-card-title">{item.title}</div>
                                    {item.vote_average != null && (
                                        <div style={{ fontSize: '.7rem', color: '#ffd700' }}>
                                            ⭐ {item.vote_average?.toFixed(1)}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default MovieDetail;