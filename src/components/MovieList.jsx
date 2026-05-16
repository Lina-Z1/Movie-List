import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
    if (!movies.length) return <p className="text-center text-Light mt-4">No movies found.</p>;

    return (
        <div className="container my-4">
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                {movies.map((movie) => (
                    <div className="col" key={movie.id}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;