import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/MovieDetail.css';
import {
    fetchShowById,
    fetchShowTrailer,
    fetchShowCast,
    fetchRelatedShows,
} from '../services/api';

const IMG_BASE = import.meta.env.VITE_TMDB_IMG_BASE;

const TVShowDetail = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
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
                const [showData, trailerUrl, castData, relatedData] = await Promise.all([
                    fetchShowById(id),
                    fetchShowTrailer(id),
                    fetchShowCast(id),
                    fetchRelatedShows(id),
                ]);
                setShow(showData);
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
    if (!show) return null;

    const languages = show.spoken_languages?.map(l => l.english_name).join(', ');
    const genres = show.genres?.slice(0, 3) || [];
    const heroBg = show.backdrop_path
        ? `${IMG_BASE}${show.backdrop_path}`
        : show.poster_path ? `${IMG_BASE}${show.poster_path}` : '/tvShow.jpg';

    return (
        <div className="container-fluid px-2 px-md-4 py-3 py-md-4 " style={{ maxWidth: 1280, minHeight: '100vh' }}>

            {/* HERO */}
            <div className="hero-wrap mb-4">
                <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />
                <div className="hero-gradient" />
                <div className="hero-content">
                    <div className="mb-1">
                        {genres.map(g => (
                            <span key={g.id} className="badge-genre">{g.name}</span>
                        ))}
                    </div>
                    <h1 className="hero-title">{show.name}</h1>
                    <p className="hero-overview">{show.overview}</p>
                    <div className="hero-meta mb-3">
                        {show.first_air_date && (
                            <span>📅 <strong>{show.first_air_date.slice(0, 4)}</strong></span>
                        )}
                        {show.number_of_seasons != null && (
                            <span>🎬 <strong>{show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}</strong></span>
                        )}
                        {languages && (
                            <span>🌐 <strong>{languages}</strong></span>
                        )}
                        {show.vote_average != null && (
                            <span className="rating-badge">⭐ {show.vote_average.toFixed(1)}</span>
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
                            <Link to={`/tv/${item.id}`} key={item.id} className="movie-card">
                                <span className="movie-card-badge">TV</span>
                                <img
                                    src={item.poster_path ? `${IMG_BASE}${item.poster_path}` : '/tvShow.jpg'}
                                    alt={item.name}
                                />
                                <div className="movie-card-body">
                                    <div className="movie-card-title">{item.name}</div>
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

export default TVShowDetail;