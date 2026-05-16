import ActorCard from './ActorCard';

const ActorsList = ({ actors }) => {
    if (!actors.length) return <p className="text-center text-muted mt-4">No actors found.</p>;

    return (
        <div className="container my-4">
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                {actors.map((actor) => (
                    <div className="col" key={actor.id}>
                        <ActorCard actor={actor} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActorsList;