import { useState, useEffect } from 'react';
import ActorsList from '../components/ActorsList';
import { fetchActors } from '../services/api';

const ActorsPage = () => {
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadActors();
        window.scrollTo(0, 0);
    }, []);

    const loadActors = async () => {
        setLoading(true);
        setError(null);
        try {
            setActors(await fetchActors());
        } catch {
            setError('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h2 className='mt-3'>Popular Actors</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && <ActorsList actors={actors} />}
        </main>
    );
};

export default ActorsPage;