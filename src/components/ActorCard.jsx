import { Link } from 'react-router-dom';

const IMG_BASE = import.meta.env.VITE_TMDB_IMG_BASE;
const PLACEHOLDER = import.meta.env.VITE_PLACEHOLDER_IMG;

const ActorCard = ({ actor }) => {
    const { id, name, profile_path, popularity } = actor;

    return (
        <Link to={`/actor/${id}`} className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm border-0">
                <div className="position-relative">
                    <img
                        src={profile_path ? `${IMG_BASE}${profile_path}` : "/actor.jpg"}
                        alt={name}
                        className="card-img-top"
                    />
                    <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
                        👍 {popularity?.toFixed(1)}K
                    </span>
                </div>
                <div className="card-body bg-dark p-2">
                    <h6 className="card-title mb-1 fw-bold text-light">{name}</h6>
                </div>
            </div>
        </Link>
    );
};

export default ActorCard;