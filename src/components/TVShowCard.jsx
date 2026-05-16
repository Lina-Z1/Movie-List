import { Link } from 'react-router-dom';

const IMG_BASE = import.meta.env.VITE_TMDB_IMG_BASE;

const TVShowCard = ({ show }) => {
    const { id, name, poster_path, vote_average, first_air_date } = show;

    return (
        <Link to={`/tv/${id}`} className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm border-0">

                <div className="position-relative">
                    <img
                        src={poster_path ? `${IMG_BASE}${poster_path}` : "/tvShow.jpg"}
                        alt={name}
                        className="card-img-top"
                    />
                    <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
                        ⭐ {vote_average?.toFixed(1)}
                    </span>
                </div>

                <div className="card-body bg-dark p-2">
                    <h6 className="movie-card-title mb-1 fw-bold">{name}</h6>
                    <p style={{ fontSize: '.7rem', color: '#ffd700' }}>{first_air_date?.slice(0, 4)}</p>
                </div>

            </div>
        </Link>
    );
};

export default TVShowCard;