import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TVShowList from '../components/TVShowList';

import {
    fetchTopRatedShows,
    fetchPopularShows,
    fetchAiringTodayShows,
    fetchOnTVShows,
    fetchShowsByGenre,
} from '../services/api';

const CATEGORY_MAP = {
    top_rated: { label: 'Top Rated' },
    popular: { label: 'Popular' },
    airing_today: { label: 'Airing Today' },
    on_tv: { label: 'On TV' },
    comedy: { label: 'Comedy' },
    drama: { label: 'Drama' },
    crime: { label: 'Crime' },
    scifi: { label: 'Sci-Fi' },
    animation: { label: 'Animation' },
};

const TVShowsPage = () => {
    const { category } = useParams();
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadShows();
    }, [category]);

    const loadShows = async () => {
        setLoading(true);
        setError(null);
        try {
            const result =
                category === 'top_rated' ? await fetchTopRatedShows() :
                    category === 'popular' ? await fetchPopularShows() :
                        category === 'airing_today' ? await fetchAiringTodayShows() :
                            category === 'on_tv' ? await fetchOnTVShows() :
                                await fetchShowsByGenre(category);
            setShows(result);
        } catch {
            setError('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h2 className="mt-3">{CATEGORY_MAP[category]?.label || 'TV Shows'}</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && <TVShowList shows={shows} />}
        </main>
    );
};

export default TVShowsPage;