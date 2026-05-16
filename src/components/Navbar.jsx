import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ onSearch, setSearchQuery }) => {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const closeMenu = () => {
        const collapseEl = document.getElementById('navbarMain');
        if (collapseEl?.classList.contains('show')) {
            const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl);
            bsCollapse.hide();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            navigate('/');
            setQuery('');
            closeMenu();
        }
    };

    const handleNavClick = () => setSearchQuery('');

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top navbar-dark-theme"  >
            <div className="container">

                <Link className="navbar-brand" to="/" onClick={() => { handleNavClick(); closeMenu(); }}>
                    🎬 Movie List
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMain"
                    aria-controls="navbarMain"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarMain">

                    <ul className="navbar-nav ms-lg-3 mb-2 mb-lg-0">

                        <li className="nav-item ms-lg-4">
                            <Link className="nav-link" to="/" onClick={() => { handleNavClick(); closeMenu(); }}>
                                Home
                            </Link>
                        </li>

                        <li className="nav-item dropdown ms-lg-4">
                            <a className="nav-link dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Movies
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/movies/top_rated" onClick={() => { handleNavClick(); closeMenu(); }}>Top Rated</Link></li>
                                <li><Link className="dropdown-item" to="/movies/comedy" onClick={() => { handleNavClick(); closeMenu(); }}>Comedy</Link></li>
                                <li><Link className="dropdown-item" to="/movies/horror" onClick={() => { handleNavClick(); closeMenu(); }}>Horror</Link></li>
                                <li><Link className="dropdown-item" to="/movies/romance" onClick={() => { handleNavClick(); closeMenu(); }}>Romance</Link></li>
                                <li><Link className="dropdown-item" to="/movies/scifi" onClick={() => { handleNavClick(); closeMenu(); }}>Sci-Fi</Link></li>
                                <li><Link className="dropdown-item" to="/movies/adventure" onClick={() => { handleNavClick(); closeMenu(); }}>Adventure</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown ms-lg-4">
                            <a className="nav-link dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                TV Shows
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/tv/category/popular" onClick={() => { handleNavClick(); closeMenu(); }}>Popular</Link></li>
                                <li><Link className="dropdown-item" to="/tv/category/airing_today" onClick={() => { handleNavClick(); closeMenu(); }}>Airing Today</Link></li>
                                <li><Link className="dropdown-item" to="/tv/category/on_tv" onClick={() => { handleNavClick(); closeMenu(); }}>On TV</Link></li>
                                <li><Link className="dropdown-item" to="/tv/category/top_rated" onClick={() => { handleNavClick(); closeMenu(); }}>Top Rated</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item ms-lg-4">
                            <Link className="nav-link" to="/actors" onClick={() => { handleNavClick(); closeMenu(); }}>
                                Actors
                            </Link>
                        </li>

                    </ul>

                    <form className="d-flex ms-auto mt-2 mt-lg-0" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Search movies & shows..."
                                aria-label="Search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button className="btn search-btn" type="submit" aria-label="Search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;