import TVShowCard from './TVShowCard';

const TVShowList = ({ shows }) => {
    if (!shows.length) return <p className="text-center text-light mt-4">No shows found.</p>;

    return (
        <div className="container my-4">
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                {shows.map((show) => (
                    <div className="col" key={show.id}>
                        <TVShowCard show={show} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TVShowList;