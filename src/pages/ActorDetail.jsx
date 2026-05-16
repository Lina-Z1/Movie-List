import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchActorById, fetchActorMovies } from '../services/api';
import '../styles/ActorDetail.css';

const IMG_BASE = import.meta.env.VITE_TMDB_IMG_BASE;
const PLACEHOLDER = import.meta.env.VITE_PLACEHOLDER_IMG;

const ActorDetail = () => {
    const { id } = useParams();
    const [actor, setActor] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAll();
        window.scrollTo(0, 0);
    }, [id]);

    const loadAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const [actorData, moviesData] = await Promise.all([
                fetchActorById(id),
                fetchActorMovies(id),
            ]);
            setActor(actorData);
            setMovies(moviesData);
        } catch {
            setError('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center actor-page">
            <div className="spinner-border text-light opacity-50" />
        </div>
    );
    if (error) return <p className="text-center text-danger py-5">{error}</p>;
    if (!actor) return null;

    return (
        <div className="actor-page">


            <div className="actor-hero">

                <div className="actor-hero-img-wrap">
                    <img
                        src={actor.profile_path ? `${IMG_BASE}${actor.profile_path}` : '/actor.jpg'}
                        alt={actor.name}
                        className="actor-hero-img"
                    />
                </div>

                <div className="actor-hero-info">
                    <h1 className="actor-name">{actor.name}</h1>

                    {actor.biography && (
                        <p className="actor-bio">{actor.biography}</p>
                    )}

                    <div className="actor-meta-grid mb-4">
                        {actor.birthday && (
                            <div className="actor-meta-card">
                                <div className="actor-meta-card-icon">
                                    <i className="bi bi-cake2" />
                                </div>
                                <div className="actor-meta-card-body">
                                    <span className="actor-meta-card-label">Birthday</span>
                                    <span className="actor-meta-card-value">{actor.birthday}</span>
                                </div>
                            </div>
                        )}
                        {actor.known_for_department && (
                            <div className="actor-meta-card">
                                <div className="actor-meta-card-icon">
                                    <i className="bi bi-camera-reels" />
                                </div>
                                <div className="actor-meta-card-body">
                                    <span className="actor-meta-card-label">Department</span>
                                    <span className="actor-meta-card-value">{actor.known_for_department}</span>
                                </div>
                            </div>
                        )}
                        {actor.place_of_birth && (
                            <div className="actor-meta-card">
                                <div className="actor-meta-card-icon">
                                    <i className="bi bi-geo-alt" />
                                </div>
                                <div className="actor-meta-card-body">
                                    <span className="actor-meta-card-label">Born In</span>
                                    <span className="actor-meta-card-value">{actor.place_of_birth}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="actor-side-posters d-none d-xl-flex">
                    {movies.slice(0, 4).map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className="actor-side-card">
                            <img
                                src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : '/movie.jpg'}
                                alt={movie.title}
                            />
                        </Link>
                    ))}
                </div>

            </div>

            {movies.length > 0 && (
                <div className="actor-movies-section">
                    <div className="actor-section-header">
                        <h5 className="actor-section-title">Related Movies</h5>
                    </div>
                    <div className="actor-movie-list">
                        {movies.slice(0, 8).map((movie, index) => {
                            const posterUrl = movie.poster_path
                                ? `${IMG_BASE}${movie.poster_path}`
                                : '/movie.jpg';
                            return (
                                <Link
                                    to={`/movie/${movie.id}`}
                                    key={movie.id}
                                    className="actor-movie-row text-decoration-none"
                                    style={{
                                        background: `linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(30,30,40,0.9) 40%, rgba(17,19,24,0.97) 100%), url(${posterUrl}) center/cover no-repeat`,
                                    }}
                                >
                                    <img src={posterUrl} alt={movie.title} className="actor-movie-thumb" />
                                    <span className="actor-movie-index">{String(index + 1).padStart(2, '0')}</span>
                                    <span className="actor-movie-title">{movie.title}</span>
                                    {movie.release_date && (
                                        <span className="actor-movie-year ms-auto">{movie.release_date.slice(0, 4)}</span>
                                    )}
                                    {movie.vote_average != null && (
                                        <span className="actor-movie-rating">
                                            <span className="actor-movie-star">⭐</span>
                                            {movie.vote_average.toFixed(1)}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

        </div>
    );
};

export default ActorDetail;